import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { LinkedInToken, LinkedInScopes, ApiRequestContract, LinkedInDriverConfig, LinkedInDriverContract, RedirectRequestContract } from '@ioc:Adonis/Addons/Ally';
import { Oauth2Driver } from '../../AbstractDrivers/Oauth2';
/**
 * LinkedIn driver to login user via LinkedIn
 */
export declare class LinkedInDriver extends Oauth2Driver<LinkedInToken, LinkedInScopes> implements LinkedInDriverContract {
    config: LinkedInDriverConfig;
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
     * Cookie name for storing the "linkedin_oauth_state"
     */
    protected stateCookieName: string;
    /**
     * Parameter name to be used for sending and receiving the state
     * from linkedin
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
    constructor(ctx: HttpContextContract, config: LinkedInDriverConfig);
    /**
     * Configuring the redirect request with defaults
     */
    protected configureRedirectRequest(request: RedirectRequestContract<LinkedInScopes>): void;
    /**
     * Returns the HTTP request with the authorization header set
     */
    protected getAuthenticatedRequest(url: string, token: string): import("@poppinss/oauth-client").HttpClient;
    /**
     * Fetches the user info from the LinkedIn API
     */
    protected getUserInfo(token: string, callback?: (request: ApiRequestContract) => void): Promise<{
        id: any;
        nickName: any;
        name: string;
        avatarUrl: string;
        original: any;
    }>;
    /**
     * Fetches the user email from the LinkedIn API
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
        email: any;
        emailVerificationState: "unsupported";
        token: LinkedInToken;
        id: any;
        nickName: any;
        name: string;
        avatarUrl: string;
        original: any;
    }>;
    /**
     * Finds the user by the access token
     */
    userFromToken(token: string, callback?: (request: ApiRequestContract) => void): Promise<{
        email: any;
        emailVerificationState: "unsupported";
        token: {
            token: string;
            type: "bearer";
        };
        id: any;
        nickName: any;
        name: string;
        avatarUrl: string;
        original: any;
    }>;
}
