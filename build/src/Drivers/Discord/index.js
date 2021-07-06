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
exports.DiscordDriver = void 0;
const Oauth2_1 = require("../../AbstractDrivers/Oauth2");
/**
 * Discord driver to login user via Discord
 */
class DiscordDriver extends Oauth2_1.Oauth2Driver {
    constructor(ctx, config) {
        super(ctx, config);
        this.config = config;
        this.accessTokenUrl = 'https://discord.com/api/oauth2/token';
        this.authorizeUrl = 'https://discord.com/api/oauth2/authorize';
        this.userInfoUrl = 'https://discord.com/api/users/@me';
        /**
         * The param name for the authorization code
         */
        this.codeParamName = 'code';
        /**
         * The param name for the error
         */
        this.errorParamName = 'error';
        /**
         * Cookie name for storing the "discord_oauth_state"
         */
        this.stateCookieName = 'discord_oauth_state';
        /**
         * Parameter name to be used for sending and receiving the state
         * from Discord
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
        if (this.config.prompt) {
            request.param('prompt', this.config.prompt);
        }
        if (this.config.guildId) {
            request.param('guild_id', this.config.guildId);
        }
        if (this.config.disableGuildSelect !== undefined) {
            request.param('disable_guild_select', this.config.disableGuildSelect);
        }
        if (this.config.permissions !== undefined) {
            request.param('permissions', this.config.permissions);
        }
    }
    /**
     * Configuring the access token API request to send extra fields
     */
    configureAccessTokenRequest(request) {
        /**
         * Send state to Discord when request is not stateles
         */
        if (!this.isStateless) {
            request.field('state', this.stateCookieValue);
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
     * Fetches the user info from the Discord API
     * https://discord.com/developers/docs/resources/user#get-current-user
     */
    async getUserInfo(token, callback) {
        const request = this.getAuthenticatedRequest(this.config.userInfoUrl || this.userInfoUrl, token);
        if (typeof callback === 'function') {
            callback(request);
        }
        const body = await request.get();
        return {
            id: body.id,
            name: `${body.username}#${body.discriminator}`,
            nickName: body.username,
            avatarUrl: body.avatar
                ? `https://cdn.discordapp.com/avatars/${body.id}/${body.avatar}.${body.avatar.startsWith('a_') ? 'gif' : 'png'}`
                : `https://cdn.discordapp.com/embed/avatars/${body.discriminator % 5}.png`,
            email: body.email,
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
exports.DiscordDriver = DiscordDriver;
