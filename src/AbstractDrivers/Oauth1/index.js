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
exports.Oauth1Driver = void 0;
/// <reference path="../../../adonis-typings/index.ts" />
const utils_1 = require("@poppinss/utils");
const oauth_client_1 = require("@poppinss/oauth-client");
const Exceptions_1 = require("../../Exceptions");
const RedirectRequest_1 = require("../../RedirectRequest");
/**
 * Abstract implementation for an Oauth1 driver
 */
class Oauth1Driver extends oauth_client_1.Oauth1Client {
  constructor(ctx, config) {
    super(config);
    this.ctx = ctx;
    this.config = config;
    this.isStateless = false;
    /**
     * Oauth client version
     */
    this.version = 'oauth1';
  }
  /**
   * The cookie name for storing the secret
   */
  get oauthSecretCookieName() {
    return `${this.oauthTokenCookieName}_secret`;
  }
  /**
   * The Oauth1Client will use the instance returned from this method to
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
    /**
     * Read and cache in-memory
     */
    this.oauthTokenCookieValue = this.ctx.request.encryptedCookie(this.oauthTokenCookieName);
    this.oauthSecretCookieValue = this.ctx.request.encryptedCookie(this.oauthSecretCookieName);
    /**
     * Clear cookies
     */
    this.ctx.response.clearCookie(this.oauthTokenCookieName);
    this.ctx.response.clearCookie(this.oauthSecretCookieName);
  }
  /**
   * Persists the token (aka state) inside the cookie
   */
  persistToken(token) {
    this.ctx.response.encryptedCookie(this.oauthTokenCookieName, token, {
      sameSite: false,
      httpOnly: true,
    });
  }
  /**
   * Persists the secret inside the cookie
   */
  persistSecret(secret) {
    this.ctx.response.encryptedCookie(this.oauthSecretCookieName, secret, {
      sameSite: false,
      httpOnly: true,
    });
  }
  /**
   * Perform stateless authentication. Only applicable for Oauth1 client
   */
  stateless() {
    this.isStateless = true;
    return this;
  }
  /**
   * Returns the redirect URL for the request.
   */
  async redirectUrl(callback) {
    return this.getRedirectUrl(callback);
  }
  /**
   * Redirect user for authorization.
   */
  async redirect(callback) {
    const { token, secret } = await this.getRequestToken();
    /**
     * Storing token and secret inside cookies. We need them
     * later
     */
    this.persistToken(token);
    this.persistSecret(secret);
    const url = await this.redirectUrl((request) => {
      request.param(this.oauthTokenParamName, token);
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
    return this.oauthTokenCookieValue !== this.ctx.request.input(this.oauthTokenParamName);
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
   * Returns the "oauth_verifier" token
   */
  getCode() {
    return this.ctx.request.input(this.oauthTokenVerifierName, null);
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
      throw Exceptions_1.OauthException.missingAuthorizationCode(this.oauthTokenVerifierName);
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
    return this.getAccessToken({ token: this.ctx.request.input(this.oauthTokenParamName), secret: "pbg9mSvbB0fOlOH1YM4AmyYtCl0vxAou3aYLbv2qhBf3N3YxmA" }, (request) => {
      request.oauth1Param(this.oauthTokenVerifierName, this.getCode());
      if (typeof callback === 'function') {
        callback(request);
      }
    });
    // return this.getAccessToken({ token: this.oauthTokenCookieValue, secret: this.oauthSecretCookieValue }, (request) => {
    //   request.oauth1Param(this.oauthTokenVerifierName, this.getCode());
    //   if (typeof callback === 'function') {
    //     callback(request);
    //   }
    // });
  }
  /**
   * Not applicable with Oauth1
   */
  async userFromToken() {
    throw new utils_1.Exception('"userFromToken" is not available with Oauth1. Use "userFromTokenAndSecret" instead');
  }
}
exports.Oauth1Driver = Oauth1Driver;
