/// <reference path="../../../adonis-typings/index.d.ts" />
import { Oauth1Client } from '@poppinss/oauth-client';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { AllyUserContract, Oauth1AccessToken, Oauth1DriverConfig, ApiRequestContract, AllyDriverContract, RedirectRequestContract } from '@ioc:Adonis/Addons/Ally';
import { RedirectRequest } from '../../RedirectRequest';
/**
 * Abstract implementation for an Oauth1 driver
 */
export declare abstract class Oauth1Driver<Token extends Oauth1AccessToken, Scopes extends string> extends Oauth1Client<Token> implements AllyDriverContract<Token, Scopes> {
    protected ctx: HttpContextContract;
    config: Oauth1DriverConfig;
    /**
     * Is the authorization process stateless?
     */
    protected isStateless: boolean;
    /**
     * The cookie name for storing the "oauth_token". Must be unique for your
     * driver. One option is to prefix the driver name. For example:
     * `twitter_oauth_token`
     */
    protected abstract oauthTokenCookieName: string;
    /**
     * Name of the "oauth_token" param. This is the query string value post
     * authorization redirect
     */
    protected abstract oauthTokenParamName: string;
    /**
     * Name of the "oauth_verifier" param. This is the query string value post
     * authorization redirect
     */
    protected abstract oauthTokenVerifierName: string;
    /**
     * The parameter name from which to fetch the error message or error code
     * post redirect.
     *
     * You must check the auth provider docs to find it
     */
    protected abstract errorParamName: string;
    /**
     * Request token URL for the auth provider. The initial set of tokens
     * are generated from this url
     */
    protected abstract requestTokenUrl: string;
    /**
     * Authorization URL for the auth provider. The user will be redirected
     * to this URL
     */
    protected abstract authorizeUrl: string;
    /**
     * The URL to hit to get an access token
     */
    protected abstract accessTokenUrl: string;
    /**
     * The query param name for defining the Authorization scopes.
     * Mostly it is `scope`. Leave to empty string when scopes
     * are not applicable
     */
    protected abstract scopeParamName: string;
    /**
     * The identifier for joining multiple scopes. Mostly it is a space.
     */
    protected abstract scopesSeparator: string;
    /**
     * Returns details for the authorized user
     */
    abstract user(callback?: (request: ApiRequestContract) => void): Promise<AllyUserContract<Token>>;
    /**
     * Finds the user by access token
     */
    abstract userFromTokenAndSecret(token: string, secret: string, callback?: (request: ApiRequestContract) => void): Promise<AllyUserContract<{
        token: string;
        secret: string;
    }>>;
    /**
     * Find if the current error code is for access denied
     */
    abstract accessDenied(): boolean;
    /**
     * Oauth client version
     */
    version: "oauth1";
    /**
     * The value of "oauth_token" and "oauth_secret" from the cookies
     */
    protected oauthTokenCookieValue?: string;
    protected oauthSecretCookieValue?: string;
    /**
     * The cookie name for storing the secret
     */
    protected get oauthSecretCookieName(): string;
    constructor(ctx: HttpContextContract, config: Oauth1DriverConfig);
    /**
     * The Oauth1Client will use the instance returned from this method to
     * build the redirect url
     */
    protected urlBuilder(url: string): RedirectRequest<string>;
    /**
     * Loads the value of state from the cookie and removes it right
     * away. We read the cookie value and clear it during the
     * current request lifecycle.
     *
     * :::::
     * NOTE
     * :::::
     *
     * This child class must call this method inside the constructor.
     */
    protected loadState(): void;
    /**
     * Persists the token (aka state) inside the cookie
     */
    private persistToken;
    /**
     * Persists the secret inside the cookie
     */
    private persistSecret;
    /**
     * Perform stateless authentication. Only applicable for Oauth2 client
     */
    stateless(): this;
    /**
     * Returns the redirect URL for the request.
     */
    redirectUrl(callback?: (request: RedirectRequestContract<Scopes>) => void): Promise<string>;
    /**
     * Redirect user for authorization.
     */
    redirect(callback?: (request: RedirectRequestContract<Scopes>) => void): Promise<void>;
    /**
     * Find if there is a state mismatch
     */
    stateMisMatch(): boolean;
    /**
     * Find if there is an error post redirect
     */
    hasError(): boolean;
    /**
     * Get the post redirect error
     */
    getError(): string | null;
    /**
     * Returns the "oauth_verifier" token
     */
    getCode(): string | null;
    /**
     * Find it the code exists
     */
    hasCode(): boolean;
    /**
     * Get access token
     */
    accessToken(callback?: (request: ApiRequestContract) => void): Promise<Token>;
    /**
     * Not applicable with Oauth1
     */
    userFromToken(): Promise<never>;
}
