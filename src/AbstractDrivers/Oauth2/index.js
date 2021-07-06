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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.Oauth2Driver = void 0;
/// <reference path="../../../adonis-typings/index.ts" />
var utils_1 = require("@poppinss/utils");
var oauth_client_1 = require("@poppinss/oauth-client");
var Exceptions_1 = require("../../Exceptions");
var RedirectRequest_1 = require("../../RedirectRequest");
/**
 * Abstract implementation for an Oauth2 driver
 */
var Oauth2Driver = /** @class */ (function (_super) {
    __extends(Oauth2Driver, _super);
    function Oauth2Driver(ctx, config) {
        var _this = _super.call(this, config) || this;
        _this.ctx = ctx;
        _this.config = config;
        /**
         * Is the authorization process stateless?
         */
        _this.isStateless = false;
        /**
         * Oauth client version
         */
        _this.version = 'oauth2';
        return _this;
    }
    /**
     * The Oauth2Client will use the instance returned from this method to
     * build the redirect url
     */
    Oauth2Driver.prototype.urlBuilder = function (url) {
        return new RedirectRequest_1.RedirectRequest(url, this.scopeParamName, this.scopesSeparator);
    };
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
    Oauth2Driver.prototype.loadState = function () {
        if (this.isStateless) {
            return;
        }
        this.stateCookieValue = this.ctx.request.encryptedCookie(this.stateCookieName);
        this.ctx.response.clearCookie(this.stateCookieName);
    };
    /**
     * Persists the state inside the cookie
     */
    Oauth2Driver.prototype.persistState = function () {
        if (this.isStateless) {
            return;
        }
        var state = this.getState();
        this.ctx.response.encryptedCookie(this.stateCookieName, state, {
            sameSite: false,
            httpOnly: true
        });
        return state;
    };
    /**
     * Perform stateless authentication. Only applicable for Oauth2 client
     */
    Oauth2Driver.prototype.stateless = function () {
        this.isStateless = true;
        return this;
    };
    /**
     * Returns the redirect URL for the request.
     */
    Oauth2Driver.prototype.redirectUrl = function (callback) {
        return __awaiter(this, void 0, void 0, function () {
            var url;
            return __generator(this, function (_a) {
                url = this.getRedirectUrl(callback);
                return [2 /*return*/, url];
            });
        });
    };
    /**
     * Redirect user for authorization.
     */
    Oauth2Driver.prototype.redirect = function (callback) {
        return __awaiter(this, void 0, void 0, function () {
            var url;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.redirectUrl(function (request) {
                            var state = _this.persistState();
                            state && request.param(_this.stateParamName, state);
                            if (typeof callback === 'function') {
                                callback(request);
                            }
                        })];
                    case 1:
                        url = _a.sent();
                        this.ctx.response.redirect(url);
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Find if there is a state mismatch
     */
    Oauth2Driver.prototype.stateMisMatch = function () {
        if (this.isStateless) {
            return false;
        }
        return this.stateCookieValue !== this.ctx.request.input(this.stateParamName);
    };
    /**
     * Find if there is an error post redirect
     */
    Oauth2Driver.prototype.hasError = function () {
        return !!this.getError();
    };
    /**
     * Get the post redirect error
     */
    Oauth2Driver.prototype.getError = function () {
        var error = this.ctx.request.input(this.errorParamName);
        if (error) {
            return error;
        }
        if (!this.hasCode()) {
            return 'unknown_error';
        }
        return null;
    };
    /**
     * Returns the authorization code
     */
    Oauth2Driver.prototype.getCode = function () {
        return this.ctx.request.input(this.codeParamName, null);
    };
    /**
     * Find it the code exists
     */
    Oauth2Driver.prototype.hasCode = function () {
        return !!this.getCode();
    };
    /**
     * Get access token
     */
    Oauth2Driver.prototype.accessToken = function (callback) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                /**
                 * We expect the user to handle errors before calling this method
                 */
                if (this.hasError()) {
                    throw Exceptions_1.OauthException.missingAuthorizationCode(this.codeParamName);
                }
                /**
                 * We expect the user to properly handle the state mis-match use case before
                 * calling this method
                 */
                if (this.stateMisMatch()) {
                    throw Exceptions_1.OauthException.stateMisMatch();
                }
                /**
                 * Get access token by providing the authorization code
                 */
                return [2 /*return*/, this.getAccessToken(function (request) {
                        request.field(_this.codeParamName, _this.getCode());
                        if (typeof callback === 'function') {
                            callback(request);
                        }
                    })];
            });
        });
    };
    /**
     * Not applicable with Oauth2
     */
    Oauth2Driver.prototype.userFromTokenAndSecret = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                throw new utils_1.Exception('"userFromTokenAndSecret" is not applicable with Oauth2. Use "userFromToken" instead');
            });
        });
    };
    return Oauth2Driver;
}(oauth_client_1.Oauth2Client));
exports.Oauth2Driver = Oauth2Driver;
