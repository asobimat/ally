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
exports.SpotifyDriver = void 0;
const Oauth2_1 = require("../../AbstractDrivers/Oauth2");
/**
 * Spotify driver to login user via Spotify
 */
class SpotifyDriver extends Oauth2_1.Oauth2Driver {
    constructor(ctx, config) {
        super(ctx, config);
        this.config = config;
        this.accessTokenUrl = 'https://accounts.spotify.com/api/token';
        this.authorizeUrl = 'https://accounts.spotify.com/authorize';
        this.userInfoUrl = 'https://api.spotify.com/v1/me';
        /**
         * The param name for the authorization code
         */
        this.codeParamName = 'code';
        /**
         * The param name for the error
         */
        this.errorParamName = 'error';
        /**
         * Cookie name for storing the "spotify_oauth_state"
         */
        this.stateCookieName = 'spotify_oauth_state';
        /**
         * Parameter name to be used for sending and receiving the state
         * from Spotify
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
        request.scopes(this.config.scopes || ['user-read-email']);
        request.param('response_type', 'code');
        request.param('grant_type', 'authorization_code');
        /**
         * Define params based upon user config
         */
        if (this.config.showDialog) {
            request.param('show_dialog', this.config.showDialog);
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
     * Fetches the user info from the Spotify API
     * https://discord.com/developers/docs/resources/user#get-current-user
     */
    async getUserInfo(token, callback) {
        const request = this.getAuthenticatedRequest(this.userInfoUrl, token);
        if (typeof callback === 'function') {
            callback(request);
        }
        const body = await request.get();
        return {
            id: body.id,
            nickName: body.display_name,
            name: body.display_name,
            email: body.email,
            avatarUrl: body.images[0]?.url || null,
            emailVerificationState: 'unsupported',
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
exports.SpotifyDriver = SpotifyDriver;
