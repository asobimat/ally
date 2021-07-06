/// <reference path="../../../adonis-typings/index.d.ts" />
import { Oauth2Client } from '@poppinss/oauth-client';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { AllyUserContract, Oauth2AccessToken, Oauth2DriverConfig, ApiRequestContract, AllyDriverContract, RedirectRequestContract } from '@ioc:Adonis/Addons/Ally';
import { RedirectRequest } from '../../RedirectRequest';
/**
 * Abstract implementation for an Oauth2 driver
 */
export declare abstract class Oauth2Driver<Token extends Oauth2AccessToken, Scopes extends string> extends Oauth2Client<Token> implements AllyDriverContract<Token, Scopes> {
    protected ctx: HttpContextContract;
    config: Oauth2DriverConfig;
    /**
     * Is the authorization process stateless?
     */
    protected isStateless: boolean;
    /**
     * The cookie name for storing the CSRF token. Must be unique for your
     * driver. One option is to prefix the driver name. For example:
     * `gh_oauth_state`
     */
    protected abstract stateCookieName: string;
    /**
     * The parameter in which to send the state to the oauth provider. The same
     * input is used to retrieve the state post redirect as well.
     *
     * You must check the auth provider docs to find it
     */
    protected abstract stateParamName: string;
    /**
     * The parameter name from which to fetch the error message or error code
     * post redirect.
     *
     * You must check the auth provider docs to find it
     */
    protected abstract errorParamName: string;
    /**
     * The parameter name from which to fetch the authorization code. It is usually
     * named as "code".
     *
     * You must check the auth provider docs to find it
     */
    protected abstract codeParamName: string;
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
     * Mostly it is `scope`
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
    abstract userFromToken(token: string, callback?: (request: ApiRequestContract) => void): Promise<AllyUserContract<{
        token: string;
        type: 'bearer';
    }>>;
    /**
     * Find if the current error code is for access denied
     */
    abstract accessDenied(): boolean;
    /**
     * Oauth client version
     */
    version: "oauth2";
    /**
     * The value of state read from the cookies.
     */
    protected stateCookieValue?: string;
    constructor(ctx: HttpContextContract, config: Oauth2DriverConfig);
    /**
     * The Oauth2Client will use the instance returned from this method to
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
     * Persists the state inside the cookie
     */
    private persistState;
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
     * Returns the authorization code
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
     * Not applicable with Oauth2
     */
    userFromTokenAndSecret(): Promise<never>;
}
