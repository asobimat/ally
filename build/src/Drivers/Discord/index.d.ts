import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { DiscordScopes, DiscordToken, ApiRequestContract, DiscordDriverConfig, DiscordDriverContract, RedirectRequestContract } from '@ioc:Adonis/Addons/Ally';
import { Oauth2Driver } from '../../AbstractDrivers/Oauth2';
/**
 * Discord driver to login user via Discord
 */
export declare class DiscordDriver extends Oauth2Driver<DiscordToken, DiscordScopes> implements DiscordDriverContract {
    config: DiscordDriverConfig;
    protected accessTokenUrl: string;
    protected authorizeUrl: string;
    protected userInfoUrl: string;
    /**
     * The param name for the authorization code
     */
    protected codeParamName: string;
    /**
     * The param name for the error
     */
    protected errorParamName: string;
    /**
     * Cookie name for storing the "discord_oauth_state"
     */
    protected stateCookieName: string;
    /**
     * Parameter name to be used for sending and receiving the state
     * from Discord
     */
    protected stateParamName: string;
    /**
     * Parameter name for defining the scopes
     */
    protected scopeParamName: string;
    /**
     * Scopes separator
     */
    protected scopesSeparator: string;
    constructor(ctx: HttpContextContract, config: DiscordDriverConfig);
    /**
     * Configuring the redirect request with defaults
     */
    protected configureRedirectRequest(request: RedirectRequestContract<DiscordScopes>): void;
    /**
     * Configuring the access token API request to send extra fields
     */
    protected configureAccessTokenRequest(request: ApiRequestContract): void;
    /**
     * Returns the HTTP request with the authorization header set
     */
    protected getAuthenticatedRequest(url: string, token: string): import("@poppinss/oauth-client").HttpClient;
    /**
     * Fetches the user info from the Discord API
     * https://discord.com/developers/docs/resources/user#get-current-user
     */
    protected getUserInfo(token: string, callback?: (request: ApiRequestContract) => void): Promise<{
        id: any;
        name: string;
        nickName: any;
        avatarUrl: string;
        email: any;
        emailVerificationState: "verified" | "unverified" | "unsupported";
        original: any;
    }>;
    /**
     * Find if the current error code is for access denied
     */
    accessDenied(): boolean;
    /**
     * Returns details for the authorized user
     */
    user(callback?: (request: ApiRequestContract) => void): Promise<{
        token: DiscordToken;
        id: any;
        name: string;
        nickName: any;
        avatarUrl: string;
        email: any;
        emailVerificationState: "verified" | "unverified" | "unsupported";
        original: any;
    }>;
    /**
     * Finds the user by the access token
     */
    userFromToken(token: string, callback?: (request: ApiRequestContract) => void): Promise<{
        token: {
            token: string;
            type: "bearer";
        };
        id: any;
        name: string;
        nickName: any;
        avatarUrl: string;
        email: any;
        emailVerificationState: "verified" | "unverified" | "unsupported";
        original: any;
    }>;
}
