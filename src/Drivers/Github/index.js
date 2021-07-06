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
exports.GithubDriver = void 0;
var Oauth2_1 = require("../../AbstractDrivers/Oauth2");
/**
 * Github driver to login user via Github
 */
var GithubDriver = /** @class */ (function (_super) {
    __extends(GithubDriver, _super);
    function GithubDriver(ctx, config) {
        var _this = _super.call(this, ctx, config) || this;
        _this.config = config;
        _this.accessTokenUrl = 'https://github.com/login/oauth/access_token';
        _this.authorizeUrl = 'https://github.com/login/oauth/authorize';
        _this.userInfoUrl = 'https://api.github.com/user';
        _this.userEmailUrl = 'https://api.github.com/user/emails';
        /**
         * The param name for the authorization code
         */
        _this.codeParamName = 'code';
        /**
         * The param name for the error
         */
        _this.errorParamName = 'error';
        /**
         * Cookie name for storing the "gh_oauth_state"
         */
        _this.stateCookieName = 'gh_oauth_state';
        /**
         * Parameter name to be used for sending and receiving the state
         * from Github
         */
        _this.stateParamName = 'state';
        /**
         * Parameter name for defining the scopes
         */
        _this.scopeParamName = 'scope';
        /**
         * Scopes separator
         */
        _this.scopesSeparator = ' ';
        /**
         * Extremely important to call the following method to clear the
         * state set by the redirect request
         */
        _this.loadState();
        return _this;
    }
    /**
     * Configuring the redirect request with defaults
     */
    GithubDriver.prototype.configureRedirectRequest = function (request) {
        /**
         * Define user defined scopes or the default one's
         */
        request.scopes(this.config.scopes || ['user']);
        /**
         * Set "allow_signup" option when defined
         */
        if (this.config.allowSignup !== undefined) {
            request.param('allow_signup', this.config.allowSignup);
        }
        /**
         * Set "login" option when defined
         */
        if (this.config.login) {
            request.param('login', this.config.login);
        }
    };
    /**
     * Configuring the access token API request to send extra fields
     */
    GithubDriver.prototype.configureAccessTokenRequest = function (request) {
        /**
         * Send state to github when request is not stateles
         */
        if (!this.isStateless) {
            request.field('state', this.stateCookieValue);
        }
        /**
         * Clearing the default defined "grant_type". Github doesn't accept this.
         * https://github.com/poppinss/oauth-client#following-is-the-list-of-fieldsparams-set-by-the-clients-implicitly
         */
        request.clearField('grant_type');
    };
    /**
     * Returns the HTTP request with the authorization header set
     */
    GithubDriver.prototype.getAuthenticatedRequest = function (url, token) {
        var request = this.httpClient(url);
        request.header('Authorization', "token " + token);
        request.header('Accept', 'application/json');
        request.parseAs('json');
        return request;
    };
    /**
     * Fetches the user info from the Github API
     * https://docs.github.com/en/rest/reference/users#get-the-authenticated-user
     */
    GithubDriver.prototype.getUserInfo = function (token, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var request, body;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        request = this.getAuthenticatedRequest(this.config.userInfoUrl || this.userInfoUrl, token);
                        if (typeof callback === 'function') {
                            callback(request);
                        }
                        return [4 /*yield*/, request.get()];
                    case 1:
                        body = _a.sent();
                        return [2 /*return*/, {
                                id: body.id,
                                nickName: body.name,
                                email: body.email,
                                emailVerificationState: (body.email
                                    ? 'verified'
                                    : 'unsupported'),
                                name: body.name,
                                avatarUrl: body.avatar_url,
                                original: body
                            }];
                }
            });
        });
    };
    /**
     * Fetches the user email from the Github API.
     * https://docs.github.com/en/rest/reference/users#list-email-addresses-for-the-authenticated-user
     */
    GithubDriver.prototype.getUserEmail = function (token, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var request, emails, mainEmail, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        request = this.getAuthenticatedRequest(this.config.userEmailUrl || this.userEmailUrl, token);
                        if (typeof callback === 'function') {
                            callback(request);
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, request.get()
                            /**
                             * Sort emails to keep the primary ones on the top
                             */
                        ];
                    case 2:
                        emails = _a.sent();
                        /**
                         * Sort emails to keep the primary ones on the top
                         */
                        emails = emails.sort(function (email) { return (email.primary ? -1 : 1); });
                        mainEmail = emails.find(function (email) { return email.verified; });
                        /**
                         * If there are no verified emails, then get any first one
                         */
                        if (!mainEmail) {
                            mainEmail = emails[0];
                        }
                        return [2 /*return*/, mainEmail];
                    case 3:
                        error_1 = _a.sent();
                        if (error_1 && error_1.response && error_1.response.statusCode === 404) {
                            return [2 /*return*/];
                        }
                        throw error_1;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Find if the current error code is for access denied
     */
    GithubDriver.prototype.accessDenied = function () {
        var error = this.getError();
        if (!error) {
            return false;
        }
        return error === 'access_denied';
    };
    /**
     * Returns details for the authorized user
     */
    GithubDriver.prototype.user = function (callback) {
        return __awaiter(this, void 0, void 0, function () {
            var token, user, emailResponse;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.accessToken(callback)];
                    case 1:
                        token = _a.sent();
                        return [4 /*yield*/, this.getUserInfo(token.token, callback)
                            /**
                             * Fetch email separately
                             */
                        ];
                    case 2:
                        user = _a.sent();
                        if (!!user.email) return [3 /*break*/, 4];
                        this.ctx.logger.trace('Fetching github user email separately');
                        return [4 /*yield*/, this.getUserEmail(token.token, callback)];
                    case 3:
                        emailResponse = _a.sent();
                        if (emailResponse) {
                            user.email = emailResponse.email;
                            user.emailVerificationState = emailResponse.verified
                                ? 'verified'
                                : 'unverified';
                        }
                        _a.label = 4;
                    case 4: return [2 /*return*/, __assign(__assign({}, user), { token: token })];
                }
            });
        });
    };
    /**
     * Finds the user by the access token
     */
    GithubDriver.prototype.userFromToken = function (token, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var user, emailResponse;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getUserInfo(token, callback)
                        /**
                         * Fetch email separately
                         */
                    ];
                    case 1:
                        user = _a.sent();
                        if (!!user.email) return [3 /*break*/, 3];
                        this.ctx.logger.trace('Fetching github user email separately');
                        return [4 /*yield*/, this.getUserEmail(token, callback)];
                    case 2:
                        emailResponse = _a.sent();
                        if (emailResponse) {
                            user.email = emailResponse.email;
                            user.emailVerificationState = emailResponse.verified
                                ? 'verified'
                                : 'unverified';
                        }
                        _a.label = 3;
                    case 3: return [2 /*return*/, __assign(__assign({}, user), { token: { token: token, type: 'bearer' } })];
                }
            });
        });
    };
    return GithubDriver;
}(Oauth2_1.Oauth2Driver));
exports.GithubDriver = GithubDriver;
