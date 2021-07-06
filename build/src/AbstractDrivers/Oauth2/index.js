"use strict";
/*
 * @adonisjs/ally
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Oauth2Driver = void 0;
/// <reference path="../../../adonis-typings/index.ts" />
const utils_1 = require("@poppinss/utils");
const oauth_client_1 = require("@poppinss/oauth-client");
const Exceptions_1 = require("../../Exceptions");
const RedirectRequest_1 = require("../../RedirectRequest");
/**
 * Abstract implementation for an Oauth2 driver
 */
class Oauth2Driver extends oauth_client_1.Oauth2Client {
    constructor(ctx, config) {
        super(config);
        this.ctx = ctx;
        this.config = config;
        /**
         * Is the authorization process stateless?
         */
        this.isStateless = false;
        /**
         * Oauth client version
         */
        this.version = 'oauth2';
    }
    /**
     * The Oauth2Client will use the instance returned from this method to
     * build the redirect url
     */
    urlBuilder(url) {
        return new RedirectRequest_1.RedirectRequest(url, this.scopeParamName, this.scopesSeparator);
    }
    /**
     * Loads the value of state from the cookie and removes it right
     * away. We read the cookie value and clear it during the
     * current request lifecycle.
     *
     * :::::
     * NOTE
     * :::::
     *
     * This child class must call this method inside the constructor.
     */
    loadState() {
        if (this.isStateless) {
            return;
        }
        this.stateCookieValue = this.ctx.request.encryptedCookie(this.stateCookieName);
        this.ctx.response.clearCookie(this.stateCookieName);
    }
    /**
     * Persists the state inside the cookie
     */
    persistState() {
        if (this.isStateless) {
            return;
        }
        const state = this.getState();
        this.ctx.response.encryptedCookie(this.stateCookieName, state, {
            sameSite: false,
            httpOnly: true,
        });
        return state;
    }
    /**
     * Perform stateless authentication. Only applicable for Oauth2 client
     */
    stateless() {
        this.isStateless = true;
        return this;
    }
    /**
     * Returns the redirect URL for the request.
     */
    async redirectUrl(callback) {
        const url = this.getRedirectUrl(callback);
        return url;
    }
    /**
     * Redirect user for authorization.
     */
    async redirect(callback) {
        const url = await this.redirectUrl((request) => {
            const state = this.persistState();
            state && request.param(this.stateParamName, state);
            if (typeof callback === 'function') {
                callback(request);
            }
        });
        this.ctx.response.redirect(url);
    }
    /**
     * Find if there is a state mismatch
     */
    stateMisMatch() {
        if (this.isStateless) {
            return false;
        }
        return this.stateCookieValue !== this.ctx.request.input(this.stateParamName);
    }
    /**
     * Find if there is an error post redirect
     */
    hasError() {
        return !!this.getError();
    }
    /**
     * Get the post redirect error
     */
    getError() {
        const error = this.ctx.request.input(this.errorParamName);
        if (error) {
            return error;
        }
        if (!this.hasCode()) {
            return 'unknown_error';
        }
        return null;
    }
    /**
     * Returns the authorization code
     */
    getCode() {
        return this.ctx.request.input(this.codeParamName, null);
    }
    /**
     * Find it the code exists
     */
    hasCode() {
        return !!this.getCode();
    }
    /**
     * Get access token
     */
    async accessToken(callback) {
        /**
         * We expect the user to handle errors before calling this method
         */
        if (this.hasError()) {
            throw Exceptions_1.OauthException.missingAuthorizationCode(this.codeParamName);
        }
        /**
         * We expect the user to properly handle the state mis-match use case before
         * calling this method
         */
        if (this.stateMisMatch()) {
            throw Exceptions_1.OauthException.stateMisMatch();
        }
        /**
         * Get access token by providing the authorization code
         */
        return this.getAccessToken((request) => {
            request.field(this.codeParamName, this.getCode());
            if (typeof callback === 'function') {
                callback(request);
            }
        });
    }
    /**
     * Not applicable with Oauth2
     */
    async userFromTokenAndSecret() {
        throw new utils_1.Exception('"userFromTokenAndSecret" is not applicable with Oauth2. Use "userFromToken" instead');
    }
}
exports.Oauth2Driver = Oauth2Driver;
