import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { SpotifyScopes, SpotifyToken, ApiRequestContract, SpotifyDriverConfig, SpotifyDriverContract, RedirectRequestContract } from '@ioc:Adonis/Addons/Ally';
import { Oauth2Driver } from '../../AbstractDrivers/Oauth2';
/**
 * Spotify driver to login user via Spotify
 */
export declare class SpotifyDriver extends Oauth2Driver<SpotifyToken, SpotifyScopes> implements SpotifyDriverContract {
    config: SpotifyDriverConfig;
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
     * Cookie name for storing the "spotify_oauth_state"
     */
    protected stateCookieName: string;
    /**
     * Parameter name to be used for sending and receiving the state
     * from Spotify
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
    constructor(ctx: HttpContextContract, config: SpotifyDriverConfig);
    /**
     * Configuring the redirect request with defaults
     */
    protected configureRedirectRequest(request: RedirectRequestContract<SpotifyScopes>): void;
    /**
     * Returns the HTTP request with the authorization header set
     */
    protected getAuthenticatedRequest(url: string, token: string): import("@poppinss/oauth-client").HttpClient;
    /**
     * Fetches the user info from the Spotify API
     * https://discord.com/developers/docs/resources/user#get-current-user
     */
    protected getUserInfo(token: string, callback?: (request: ApiRequestContract) => void): Promise<{
        id: any;
        nickName: any;
        name: any;
        email: any;
        avatarUrl: any;
        emailVerificationState: "unsupported";
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
        token: SpotifyToken;
        id: any;
        nickName: any;
        name: any;
        email: any;
        avatarUrl: any;
        emailVerificationState: "unsupported";
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
        nickName: any;
        name: any;
        email: any;
        avatarUrl: any;
        emailVerificationState: "unsupported";
        original: any;
    }>;
}
