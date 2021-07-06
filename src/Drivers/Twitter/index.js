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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.TwitterDriver = void 0;
var Oauth1_1 = require("../../AbstractDrivers/Oauth1");
/**
 * Twitter driver to login user via twitter
 */
var TwitterDriver = /** @class */ (function (_super) {
    __extends(TwitterDriver, _super);
    function TwitterDriver(ctx, config) {
        var _this = _super.call(this, ctx, config) || this;
        _this.ctx = ctx;
        _this.config = config;
        _this.requestTokenUrl = 'https://api.twitter.com/oauth/request_token';
        _this.authorizeUrl = 'https://api.twitter.com/oauth/authenticate';
        _this.accessTokenUrl = 'https://api.twitter.com/oauth/access_token';
        _this.userInfoUrl = 'https://api.twitter.com/1.1/account/verify_credentials.json';
        /**
         * The query string param name for the error.
         */
        _this.errorParamName = 'error';
        /**
         * The query string param name for the "oauth_verifier". Used
         * for both the post redirect value access and during the
         * time of generating the access token
         */
        _this.oauthTokenVerifierName = 'oauth_verifier';
        /**
         * Cookie name for storing the oauth_token. The cookie
         * name for storing oauth_token_secret is derived
         * from this property
         */
        _this.oauthTokenCookieName = 'twitter_oauth_token';
        /**
         * Param name for defined the "oauth_token" pre redirect
         * and also used post redirect for reading the "oauth_token"
         * value
         */
        _this.oauthTokenParamName = 'oauth_token';
        /**
         * Twitter doesn't support scopes
         */
        _this.scopeParamName = '';
        _this.scopesSeparator = ' ';
        /**
         * Extremely important to call the following method to clear the
         * state set by the redirect request
         */
        _this.loadState();
        return _this;
    }
    /**
     * Returns user info
     */
    TwitterDriver.prototype.getUserInfo = function (token, secret, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var requestToken, userInfoUrl, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        requestToken = { token: token, secret: secret };
                        userInfoUrl = this.config.userInfoUrl || this.userInfoUrl;
                        return [4 /*yield*/, this.makeSignedRequest(userInfoUrl, 'get', requestToken, function (request) {
                                /**
                                 * Include email
                                 */
                                request.param('include_email', true);
                                /**
                                 * Parse response as JSON
                                 */
                                request['parseAs']('json');
                                /**
                                 * Invoke user callback
                                 */
                                if (typeof callback === 'function') {
                                    callback(request);
                                }
                            })];
                    case 1:
                        user = _a.sent();
                        return [2 /*return*/, {
                                id: user.id_str,
                                nickName: user.screen_name,
                                name: user.name || user.screen_name,
                                email: user.email,
                                emailVerificationState: 'unsupported',
                                avatarUrl: user.profile_image_url_https.replace('_normal.jpg', '_400x400.jpg'),
                                original: user
                            }];
                }
            });
        });
    };
    /**
     * Returns details for the authorized user
     */
    TwitterDriver.prototype.user = function (callback) {
        return __awaiter(this, void 0, void 0, function () {
            var token, userInfo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.accessToken()];
                    case 1:
                        token = _a.sent();
                        return [4 /*yield*/, this.getUserInfo(token.token, token.secret, callback)];
                    case 2:
                        userInfo = _a.sent();
                        return [2 /*return*/, __assign(__assign({}, userInfo), { token: token })];
                }
            });
        });
    };
    /**
     * Finds the user info from the "oauth_token" and "oauth_token_secret"
     * access from the access token.
     */
    TwitterDriver.prototype.userFromTokenAndSecret = function (token, secret, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var userInfo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getUserInfo(token, secret, callback)];
                    case 1:
                        userInfo = _a.sent();
                        return [2 /*return*/, __assign(__assign({}, userInfo), { token: { token: token, secret: secret } })];
                }
            });
        });
    };
    /**
     * Find if the current error code is for access denied
     */
    TwitterDriver.prototype.accessDenied = function () {
        return this.ctx.request.input('denied');
    };
    return TwitterDriver;
}(Oauth1_1.Oauth1Driver));
exports.TwitterDriver = TwitterDriver;
