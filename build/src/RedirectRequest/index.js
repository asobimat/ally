"use strict";
/*
 * @adonisjs/ally
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedirectRequest = void 0;
const oauth_client_1 = require("@poppinss/oauth-client");
/**
 * Redirect request with first class support for defining scopes.
 */
class RedirectRequest extends oauth_client_1.UrlBuilder {
    constructor(baseUrl, scopeParamName, scopeSeparator) {
        super(baseUrl);
        this.scopeParamName = scopeParamName;
        this.scopeSeparator = scopeSeparator;
    }
    transformScopes(callback) {
        this.scopesTransformer = callback;
        return this;
    }
    /**
     * Define an array of scopes.
     */
    scopes(scopes) {
        if (typeof this.scopesTransformer === 'function') {
            scopes = this.scopesTransformer(scopes);
        }
        this.param(this.scopeParamName, scopes.join(this.scopeSeparator));
        return this;
    }
    /**
     * Clear existing scopes
     */
    clearScopes() {
        this.clearParam(this.scopeParamName);
        return this;
    }
    /**
     * Merge to existing scopes
     */
    mergeScopes(scopes) {
        if (typeof this.scopesTransformer === 'function') {
            scopes = this.scopesTransformer(scopes);
        }
        const mergedScopes = (this.params[this.scopeParamName] || []).concat(scopes);
        this.scopes(mergedScopes);
        return this;
    }
}
exports.RedirectRequest = RedirectRequest;
