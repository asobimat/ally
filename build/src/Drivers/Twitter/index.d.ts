import { Oauth1Driver } from '../../AbstractDrivers/Oauth1';
import { TwitterToken, AllyUserContract, ApiRequestContract, TwitterDriverConfig, TwitterDriverContract } from '@ioc:Adonis/Addons/Ally';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
/**
 * Twitter driver to login user via twitter
 */
export declare class TwitterDriver extends Oauth1Driver<TwitterToken, string> implements TwitterDriverContract {
    protected ctx: HttpContextContract;
    config: TwitterDriverConfig;
    protected requestTokenUrl: string;
    protected authorizeUrl: string;
    protected accessTokenUrl: string;
    protected userInfoUrl: string;
    /**
     * The query string param name for the error.
     */
    protected errorParamName: string;
    /**
     * The query string param name for the "oauth_verifier". Used
     * for both the post redirect value access and during the
     * time of generating the access token
     */
    protected oauthTokenVerifierName: string;
    /**
     * Cookie name for storing the oauth_token. The cookie
     * name for storing oauth_token_secret is derived
     * from this property
     */
    protected oauthTokenCookieName: string;
    /**
     * Param name for defined the "oauth_token" pre redirect
     * and also used post redirect for reading the "oauth_token"
     * value
     */
    protected oauthTokenParamName: string;
    /**
     * Twitter doesn't support scopes
     */
    protected scopeParamName: string;
    protected scopesSeparator: string;
    constructor(ctx: HttpContextContract, config: TwitterDriverConfig);
    /**
     * Returns user info
     */
    protected getUserInfo(token: string, secret: string, callback?: (request: ApiRequestContract) => void): Promise<{
        id: any;
        nickName: any;
        name: any;
        email: any;
        emailVerificationState: "unsupported";
        avatarUrl: any;
        original: any;
    }>;
    /**
     * Returns details for the authorized user
     */
    user(callback?: (request: ApiRequestContract) => void): Promise<{
        token: TwitterToken;
        id: any;
        nickName: any;
        name: any;
        email: any;
        emailVerificationState: "unsupported";
        avatarUrl: any;
        original: any;
    }>;
    /**
     * Finds the user info from the "oauth_token" and "oauth_token_secret"
     * access from the access token.
     */
    userFromTokenAndSecret(token: string, secret: string, callback?: (request: ApiRequestContract) => void): Promise<AllyUserContract<{
        token: string;
        secret: string;
    }>>;
    /**
     * Find if the current error code is for access denied
     */
    accessDenied(): boolean;
}
