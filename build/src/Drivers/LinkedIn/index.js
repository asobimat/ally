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
exports.LinkedInDriver = void 0;
const utils_1 = require("@poppinss/utils");
const Oauth2_1 = require("../../AbstractDrivers/Oauth2");
/**
 * LinkedIn driver to login user via LinkedIn
 */
class LinkedInDriver extends Oauth2_1.Oauth2Driver {
    constructor(ctx, config) {
        super(ctx, config);
        this.config = config;
        this.accessTokenUrl = 'https://www.linkedin.com/oauth/v2/accessToken';
        this.authorizeUrl = 'https://www.linkedin.com/oauth/v2/authorization';
        this.userInfoUrl = 'https://api.linkedin.com/v2/me';
        this.userEmailUrl = 'https://api.linkedin.com/v2/clientAwareMemberHandles';
        /**
         * The param name for the authorization code
         */
        this.codeParamName = 'code';
        /**
         * The param name for the error
         */
        this.errorParamName = 'error';
        /**
         * Cookie name for storing the "linkedin_oauth_state"
         */
        this.stateCookieName = 'linkedin_oauth_state';
        /**
         * Parameter name to be used for sending and receiving the state
         * from linkedin
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
        request.scopes(this.config.scopes || ['r_emailaddress', 'r_liteprofile']);
        /**
         * Set "response_type" param
         */
        request.param('response_type', 'code');
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
     * Fetches the user info from the LinkedIn API
     */
    async getUserInfo(token, callback) {
        let url = this.config.userInfoUrl || this.userInfoUrl;
        const request = this.getAuthenticatedRequest(url, token);
        request.param('projection', '(id,localizedLastName,localizedFirstName,vanityName,profilePicture(displayImage~digitalmediaAsset:playableStreams))');
        if (typeof callback === 'function') {
            callback(request);
        }
        const body = await request.get();
        /**
         * Finding the user avatar
         */
        let avatar = '';
        if (body.profilePicture) {
            const avatars = body.profilePicture['displayImage~']['elements'] || [];
            if (avatars.length && avatars[0].identifiers && avatars[0].identifiers.length) {
                avatar = avatars[0].identifiers[0].identifier;
            }
        }
        return {
            id: body.id,
            nickName: body.vanityName || `${body.localizedFirstName} ${body.localizedLastName}`,
            name: `${body.localizedFirstName} ${body.localizedLastName}`,
            avatarUrl: avatar,
            original: body,
        };
    }
    /**
     * Fetches the user email from the LinkedIn API
     */
    async getUserEmail(token, callback) {
        let url = this.config.userEmailUrl || this.userEmailUrl;
        const request = this.getAuthenticatedRequest(url, token);
        request.param('q', 'members');
        request.param('projection', '(elements*(primary,type,handle~))');
        if (typeof callback === 'function') {
            callback(request);
        }
        const body = await request.get();
        let mainEmail = body.elements.find((resource) => {
            return resource.type === 'EMAIL' && resource['handle~'];
        });
        /**
         * We except email to always exist
         */
        if (!mainEmail) {
            throw new utils_1.Exception('Cannot request user email. Make sure you are using the "r_emailaddress" scope');
        }
        return mainEmail['handle~']['emailAddress'];
    }
    /**
     * Find if the current error code is for access denied
     */
    accessDenied() {
        const error = this.getError();
        if (!error) {
            return false;
        }
        return error === 'user_cancelled_login' || error === 'user_cancelled_authorize';
    }
    /**
     * Returns details for the authorized user
     */
    async user(callback) {
        const token = await this.accessToken(callback);
        const user = await this.getUserInfo(token.token, callback);
        const email = await this.getUserEmail(token.token, callback);
        return {
            ...user,
            email: email,
            emailVerificationState: 'unsupported',
            token: token,
        };
    }
    /**
     * Finds the user by the access token
     */
    async userFromToken(token, callback) {
        const user = await this.getUserInfo(token, callback);
        const email = await this.getUserEmail(token, callback);
        return {
            ...user,
            email: email,
            emailVerificationState: 'unsupported',
            token: { token, type: 'bearer' },
        };
    }
}
exports.LinkedInDriver = LinkedInDriver;
