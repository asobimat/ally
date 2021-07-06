"use strict";
/*
 * @adonisjs/ally
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.RedirectRequest = void 0;
var oauth_client_1 = require("@poppinss/oauth-client");
/**
 * Redirect request with first class support for defining scopes.
 */
var RedirectRequest = /** @class */ (function (_super) {
    __extends(RedirectRequest, _super);
    function RedirectRequest(baseUrl, scopeParamName, scopeSeparator) {
        var _this = _super.call(this, baseUrl) || this;
        _this.scopeParamName = scopeParamName;
        _this.scopeSeparator = scopeSeparator;
        return _this;
    }
    RedirectRequest.prototype.transformScopes = function (callback) {
        this.scopesTransformer = callback;
        return this;
    };
    /**
     * Define an array of scopes.
     */
    RedirectRequest.prototype.scopes = function (scopes) {
        if (typeof this.scopesTransformer === 'function') {
            scopes = this.scopesTransformer(scopes);
        }
        this.param(this.scopeParamName, scopes.join(this.scopeSeparator));
        return this;
    };
    /**
     * Clear existing scopes
     */
    RedirectRequest.prototype.clearScopes = function () {
        this.clearParam(this.scopeParamName);
        return this;
    };
    /**
     * Merge to existing scopes
     */
    RedirectRequest.prototype.mergeScopes = function (scopes) {
        if (typeof this.scopesTransformer === 'function') {
            scopes = this.scopesTransformer(scopes);
        }
        var mergedScopes = (this.params[this.scopeParamName] || []).concat(scopes);
        this.scopes(mergedScopes);
        return this;
    };
    return RedirectRequest;
}(oauth_client_1.UrlBuilder));
exports.RedirectRequest = RedirectRequest;
