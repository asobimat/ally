import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { FacebookToken, FacebookScopes, LiteralStringUnion, ApiRequestContract, FacebookDriverConfig, FacebookProfileFields, FacebookDriverContract, RedirectRequestContract } from '@ioc:Adonis/Addons/Ally';
import { Oauth2Driver } from '../../AbstractDrivers/Oauth2';
/**
 * Facebook driver to login user via Facebook
 */
export declare class FacebookDriver extends Oauth2Driver<FacebookToken, FacebookScopes> implements FacebookDriverContract {
    config: FacebookDriverConfig;
    protected accessTokenUrl: string;
    protected authorizeUrl: string;
    protected userInfoUrl: string;
    /**
     * The default set of fields to query for the user request
     */
    protected userFields: LiteralStringUnion<FacebookProfileFields>[];
    /**
     * The param name for the authorization code
     */
    protected codeParamName: string;
    /**
     * The param name for the error
     */
    protected errorParamName: string;
    /**
     * Cookie name for storing the "facebok_oauth_state"
     */
    protected stateCookieName: string;
    /**
     * Parameter name to be used for sending and receiving the state
     * from Facebok
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
    constructor(ctx: HttpContextContract, config: FacebookDriverConfig);
    /**
     * Configuring the redirect request with defaults
     */
    protected configureRedirectRequest(request: RedirectRequestContract<FacebookScopes>): void;
    /**
     * Returns the HTTP request with the authorization header set
     */
    protected getAuthenticatedRequest(url: string, token: string): import("@poppinss/oauth-client").HttpClient;
    /**
     * Fetches the user info from the Facebook API
     * https://developers.facebook.com/docs/graph-api/reference/user/
     */
    protected getUserInfo(token: string, callback?: (request: ApiRequestContract) => void): Promise<{
        id: any;
        name: any;
        nickName: any;
        avatarUrl: any;
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
        token: FacebookToken;
        id: any;
        name: any;
        nickName: any;
        avatarUrl: any;
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
        name: any;
        nickName: any;
        avatarUrl: any;
        email: any;
        emailVerificationState: "verified" | "unverified" | "unsupported";
        original: any;
    }>;
}
