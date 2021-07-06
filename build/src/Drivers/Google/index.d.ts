import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { GoogleToken, GoogleScopes, GoogleDriverConfig, ApiRequestContract, GoogleDriverContract, RedirectRequestContract } from '@ioc:Adonis/Addons/Ally';
import { Oauth2Driver } from '../../AbstractDrivers/Oauth2';
/**
 * Google driver to login user via Google
 */
export declare class GoogleDriver extends Oauth2Driver<GoogleToken, GoogleScopes> implements GoogleDriverContract {
    config: GoogleDriverConfig;
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
     * Cookie name for storing the "google_oauth_state"
     */
    protected stateCookieName: string;
    /**
     * Parameter name to be used for sending and receiving the state
     * from google
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
    constructor(ctx: HttpContextContract, config: GoogleDriverConfig);
    /**
     * Configuring the redirect request with defaults
     */
    protected configureRedirectRequest(request: RedirectRequestContract<GoogleScopes>): void;
    /**
     * Returns the HTTP request with the authorization header set
     */
    protected getAuthenticatedRequest(url: string, token: string): import("@poppinss/oauth-client").HttpClient;
    /**
     * Fetches the user info from the Google API
     */
    protected getUserInfo(token: string, callback?: (request: ApiRequestContract) => void): Promise<{
        id: any;
        nickName: any;
        name: any;
        email: any;
        avatarUrl: any;
        emailVerificationState: "verified" | "unverified";
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
        token: GoogleToken;
        id: any;
        nickName: any;
        name: any;
        email: any;
        avatarUrl: any;
        emailVerificationState: "verified" | "unverified";
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
        emailVerificationState: "verified" | "unverified";
        original: any;
    }>;
    /**
     * Prefixes google scopes with the url
     */
    buildScopes(scopes: string[]): string[];
}
