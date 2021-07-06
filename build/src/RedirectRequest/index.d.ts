import { UrlBuilder } from '@poppinss/oauth-client';
import { RedirectRequestContract, LiteralStringUnion } from '@ioc:Adonis/Addons/Ally';
/**
 * Redirect request with first class support for defining scopes.
 */
export declare class RedirectRequest<Scopes extends string> extends UrlBuilder implements RedirectRequestContract<Scopes> {
    private scopeParamName;
    private scopeSeparator;
    private scopesTransformer;
    constructor(baseUrl: string, scopeParamName: string, scopeSeparator: string);
    transformScopes(callback: (scopes: LiteralStringUnion<Scopes>[]) => string[]): this;
    /**
     * Define an array of scopes.
     */
    scopes(scopes: LiteralStringUnion<Scopes>[]): this;
    /**
     * Clear existing scopes
     */
    clearScopes(): this;
    /**
     * Merge to existing scopes
     */
    mergeScopes(scopes: LiteralStringUnion<Scopes>[]): this;
}
