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
exports.TwitterDriver = void 0;
const Oauth1_1 = require("../../AbstractDrivers/Oauth1");
/**
 * Twitter driver to login user via twitter
 */
class TwitterDriver extends Oauth1_1.Oauth1Driver {
    constructor(ctx, config) {
        super(ctx, config);
        this.ctx = ctx;
        this.config = config;
        this.requestTokenUrl = 'https://api.twitter.com/oauth/request_token';
        this.authorizeUrl = 'https://api.twitter.com/oauth/authenticate';
        this.accessTokenUrl = 'https://api.twitter.com/oauth/access_token';
        this.userInfoUrl = 'https://api.twitter.com/1.1/account/verify_credentials.json';
        /**
         * The query string param name for the error.
         */
        this.errorParamName = 'error';
        /**
         * The query string param name for the "oauth_verifier". Used
         * for both the post redirect value access and during the
         * time of generating the access token
         */
        this.oauthTokenVerifierName = 'oauth_verifier';
        /**
         * Cookie name for storing the oauth_token. The cookie
         * name for storing oauth_token_secret is derived
         * from this property
         */
        this.oauthTokenCookieName = 'twitter_oauth_token';
        /**
         * Param name for defined the "oauth_token" pre redirect
         * and also used post redirect for reading the "oauth_token"
         * value
         */
        this.oauthTokenParamName = 'oauth_token';
        /**
         * Twitter doesn't support scopes
         */
        this.scopeParamName = '';
        this.scopesSeparator = ' ';
        /**
         * Extremely important to call the following method to clear the
         * state set by the redirect request
         */
        this.loadState();
    }
    /**
     * Returns user info
     */
    async getUserInfo(token, secret, callback) {
        const requestToken = { token, secret };
        const userInfoUrl = this.config.userInfoUrl || this.userInfoUrl;
        const user = await this.makeSignedRequest(userInfoUrl, 'get', requestToken, (request) => {
            /**
             * Include email
             */
            request.param('include_email', true);
            /**
             * Parse response as JSON
             */
            request['parseAs']('json');
            /**
             * Invoke user callback
             */
            if (typeof callback === 'function') {
                callback(request);
            }
        });
        return {
            id: user.id_str,
            nickName: user.screen_name,
            name: user.name || user.screen_name,
            email: user.email,
            emailVerificationState: 'unsupported',
            avatarUrl: user.profile_image_url_https.replace('_normal.jpg', '_400x400.jpg'),
            original: user,
        };
    }
    /**
     * Returns details for the authorized user
     */
    async user(callback) {
        const token = await this.accessToken();
        const userInfo = await this.getUserInfo(token.token, token.secret, callback);
        return {
            ...userInfo,
            token,
        };
    }
    /**
     * Finds the user info from the "oauth_token" and "oauth_token_secret"
     * access from the access token.
     */
    async userFromTokenAndSecret(token, secret, callback) {
        const userInfo = await this.getUserInfo(token, secret, callback);
        return {
            ...userInfo,
            token: { token, secret },
        };
    }
    /**
     * Find if the current error code is for access denied
     */
    accessDenied() {
        return this.ctx.request.input('denied');
    }
}
exports.TwitterDriver = TwitterDriver;
