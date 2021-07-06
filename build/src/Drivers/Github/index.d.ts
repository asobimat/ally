import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { GithubToken, GithubScopes, GithubDriverConfig, ApiRequestContract, GithubDriverContract, RedirectRequestContract } from '@ioc:Adonis/Addons/Ally';
import { Oauth2Driver } from '../../AbstractDrivers/Oauth2';
/**
 * Github driver to login user via Github
 */
export declare class GithubDriver extends Oauth2Driver<GithubToken, GithubScopes> implements GithubDriverContract {
    config: GithubDriverConfig;
    protected accessTokenUrl: string;
    protected authorizeUrl: string;
    protected userInfoUrl: string;
    protected userEmailUrl: string;
    /**
     * The param name for the authorization code
     */
    protected codeParamName: string;
    /**
     * The param name for the error
     */
    protected errorParamName: string;
    /**
     * Cookie name for storing the "gh_oauth_state"
     */
    protected stateCookieName: string;
    /**
     * Parameter name to be used for sending and receiving the state
     * from Github
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
    constructor(ctx: HttpContextContract, config: GithubDriverConfig);
    /**
     * Configuring the redirect request with defaults
     */
    protected configureRedirectRequest(request: RedirectRequestContract<GithubScopes>): void;
    /**
     * Configuring the access token API request to send extra fields
     */
    protected configureAccessTokenRequest(request: ApiRequestContract): void;
    /**
     * Returns the HTTP request with the authorization header set
     */
    protected getAuthenticatedRequest(url: string, token: string): import("@poppinss/oauth-client").HttpClient;
    /**
     * Fetches the user info from the Github API
     * https://docs.github.com/en/rest/reference/users#get-the-authenticated-user
     */
    protected getUserInfo(token: string, callback?: (request: ApiRequestContract) => void): Promise<{
        id: any;
        nickName: any;
        email: any;
        emailVerificationState: "verified" | "unverified" | "unsupported";
        name: any;
        avatarUrl: any;
        original: any;
    }>;
    /**
     * Fetches the user email from the Github API.
     * https://docs.github.com/en/rest/reference/users#list-email-addresses-for-the-authenticated-user
     */
    protected getUserEmail(token: string, callback?: (request: ApiRequestContract) => void): Promise<any>;
    /**
     * Find if the current error code is for access denied
     */
    accessDenied(): boolean;
    /**
     * Returns details for the authorized user
     */
    user(callback?: (request: ApiRequestContract) => void): Promise<{
        token: GithubToken;
        id: any;
        nickName: any;
        email: any;
        emailVerificationState: "verified" | "unverified" | "unsupported";
        name: any;
        avatarUrl: any;
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
        email: any;
        emailVerificationState: "verified" | "unverified" | "unsupported";
        name: any;
        avatarUrl: any;
        original: any;
    }>;
}
