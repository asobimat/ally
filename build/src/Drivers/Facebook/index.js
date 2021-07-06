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
exports.FacebookDriver = void 0;
const Oauth2_1 = require("../../AbstractDrivers/Oauth2");
/**
 * Facebook driver to login user via Facebook
 */
class FacebookDriver extends Oauth2_1.Oauth2Driver {
    constructor(ctx, config) {
        super(ctx, config);
        this.config = config;
        this.accessTokenUrl = 'https://graph.facebook.com/v10.0/oauth/access_token';
        this.authorizeUrl = 'https://www.facebook.com/v10.0/dialog/oauth';
        this.userInfoUrl = 'https://graph.facebook.com/v10.0/me';
        /**
         * The default set of fields to query for the user request
         */
        this.userFields = [
            'name',
            'first_name',
            'last_name',
            'link',
            'email',
            'picture.width(400).height(400)',
            'verified',
        ];
        /**
         * The param name for the authorization code
         */
        this.codeParamName = 'code';
        /**
         * The param name for the error
         */
        this.errorParamName = 'error';
        /**
         * Cookie name for storing the "facebok_oauth_state"
         */
        this.stateCookieName = 'facebok_oauth_state';
        /**
         * Parameter name to be used for sending and receiving the state
         * from Facebok
         */
        this.stateParamName = 'state';
        /**
         * Parameter name for defining the scopes
         */
        this.scopeParamName = 'scope';
        /**
         * Scopes separator
         */
        this.scopesSeparator = ' ';
        /**
         * Extremely important to call the following method to clear the
         * state set by the redirect request
         */
        this.loadState();
    }
    /**
     * Configuring the redirect request with defaults
     */
    configureRedirectRequest(request) {
        /**
         * Define user defined scopes or the default one's
         */
        request.scopes(this.config.scopes || ['email']);
        request.param('response_type', 'code');
        request.param('grant_type', 'authorization_code');
        /**
         * Define params based upon user config
         */
        if (this.config.display) {
            request.param('display', this.config.display);
        }
        if (this.config.authType) {
            request.param('auth_type', this.config.authType);
        }
    }
    /**
     * Returns the HTTP request with the authorization header set
     */
    getAuthenticatedRequest(url, token) {
        const request = this.httpClient(url);
        request.header('Authorization', `Bearer ${token}`);
        request.header('Accept', 'application/json');
        request.parseAs('json');
        return request;
    }
    /**
     * Fetches the user info from the Facebook API
     * https://developers.facebook.com/docs/graph-api/reference/user/
     */
    async getUserInfo(token, callback) {
        const request = this.getAuthenticatedRequest(this.config.userInfoUrl || this.userInfoUrl, token);
        request.param('fields', (this.config.userFields || this.userFields).join(','));
        const body = await request.get();
        /**
         * Invoke callback if defined
         */
        if (typeof callback === 'function') {
            callback(request);
        }
        return {
            id: body.id,
            name: body.name,
            nickName: body.name,
            // https://developers.facebook.com/docs/graph-api/reference/user/picture/
            avatarUrl: body.picture?.data?.url || null,
            email: body.email || null,
            // Important note: https://developers.facebook.com/docs/facebook-login/multiple-providers#postfb1
            emailVerificationState: 'verified' in body
                ? body.verified
                    ? 'verified'
                    : 'unverified'
                : 'unsupported',
            original: body,
        };
    }
    /**
     * Find if the current error code is for access denied
     */
    accessDenied() {
        const error = this.getError();
        if (!error) {
            return false;
        }
        return error === 'access_denied';
    }
    /**
     * Returns details for the authorized user
     */
    async user(callback) {
        const token = await this.accessToken(callback);
        const user = await this.getUserInfo(token.token, callback);
        return {
            ...user,
            token,
        };
    }
    /**
     * Finds the user by the access token
     */
    async userFromToken(token, callback) {
        const user = await this.getUserInfo(token, callback);
        return {
            ...user,
            token: { token, type: 'bearer' },
        };
    }
}
exports.FacebookDriver = FacebookDriver;
