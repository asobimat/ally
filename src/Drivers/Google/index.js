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
exports.GoogleDriver = void 0;
var Oauth2_1 = require("../../AbstractDrivers/Oauth2");
var SCOPE_PREFIXES = {
    'https://www.googleapis.com/auth': [
        'userinfo.email',
        'userinfo.profile',
        'contacts',
        'contacts.other.readonly',
        'contacts.readonly',
        'directory.readonly',
        'user.addresses.read',
        'user.birthday.read',
        'user.emails.read',
        'user.gender.read',
        'user.organization.read',
        'user.phonenumbers.read',
        'analytics',
        'analytics.readonly',
        'documents',
        'documents.readonly',
        'forms',
        'forms.currentonly',
        'groups',
        'spreadsheets',
        'calendar',
        'calendar.events',
        'calendar.events.readonly',
        'calendar.readonly',
        'calendar.settings.readonly',
        'drive',
        'drive.appdata',
        'drive.file',
        'drive.metadata',
        'drive.metadata.readonly',
        'drive.photos.readonly',
        'drive.readonly',
        'drive.scripts',
    ]
};
/**
 * Google driver to login user via Google
 */
var GoogleDriver = /** @class */ (function (_super) {
    __extends(GoogleDriver, _super);
    function GoogleDriver(ctx, config) {
        var _this = _super.call(this, ctx, config) || this;
        _this.config = config;
        _this.accessTokenUrl = 'https://oauth2.googleapis.com/token';
        _this.authorizeUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
        _this.userInfoUrl = 'https://www.googleapis.com/oauth2/v3/userinfo';
        /**
         * The param name for the authorization code
         */
        _this.codeParamName = 'code';
        /**
         * The param name for the error
         */
        _this.errorParamName = 'error';
        /**
         * Cookie name for storing the "google_oauth_state"
         */
        _this.stateCookieName = 'google_oauth_state';
        /**
         * Parameter name to be used for sending and receiving the state
         * from google
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
    GoogleDriver.prototype.configureRedirectRequest = function (request) {
        var _this = this;
        request.transformScopes(function (scopes) { return _this.buildScopes(scopes); });
        /**
         * Define user defined scopes or the default one's
         */
        request.scopes(this.config.scopes || ['openid', 'userinfo.email', 'userinfo.profile']);
        /**
         * Set "response_type" param
         */
        request.param('response_type', 'code');
        /**
         * Define params based upon user config
         */
        if (this.config.accessType) {
            request.param('access_type', this.config.accessType);
        }
        if (this.config.prompt) {
            request.param('prompt', this.config.prompt);
        }
        if (this.config.display) {
            request.param('display', this.config.display);
        }
        if (this.config.hostedDomain) {
            request.param('hd', this.config.hostedDomain);
        }
    };
    /**
     * Returns the HTTP request with the authorization header set
     */
    GoogleDriver.prototype.getAuthenticatedRequest = function (url, token) {
        var request = this.httpClient(url);
        request.header('Authorization', "Bearer " + token);
        request.header('Accept', 'application/json');
        request.parseAs('json');
        return request;
    };
    /**
     * Fetches the user info from the Google API
     */
    GoogleDriver.prototype.getUserInfo = function (token, callback) {
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
                                id: body.sub,
                                nickName: body.name,
                                name: body.name,
                                email: body.email,
                                avatarUrl: body.picture,
                                emailVerificationState: body.email_verified ? 'verified' : 'unverified',
                                original: body
                            }];
                }
            });
        });
    };
    /**
     * Find if the current error code is for access denied
     */
    GoogleDriver.prototype.accessDenied = function () {
        var error = this.getError();
        if (!error) {
            return false;
        }
        return error === 'access_denied';
    };
    /**
     * Returns details for the authorized user
     */
    GoogleDriver.prototype.user = function (callback) {
        return __awaiter(this, void 0, void 0, function () {
            var token, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.accessToken(callback)];
                    case 1:
                        token = _a.sent();
                        return [4 /*yield*/, this.getUserInfo(token.token, callback)];
                    case 2:
                        user = _a.sent();
                        return [2 /*return*/, __assign(__assign({}, user), { token: token })];
                }
            });
        });
    };
    /**
     * Finds the user by the access token
     */
    GoogleDriver.prototype.userFromToken = function (token, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getUserInfo(token, callback)];
                    case 1:
                        user = _a.sent();
                        return [2 /*return*/, __assign(__assign({}, user), { token: { token: token, type: 'bearer' } })];
                }
            });
        });
    };
    /**
     * Prefixes google scopes with the url
     */
    GoogleDriver.prototype.buildScopes = function (scopes) {
        return scopes.map(function (name) {
            var prefix = Object.keys(SCOPE_PREFIXES).find(function (one) { return SCOPE_PREFIXES[one].includes(name); });
            return prefix ? prefix + "/" + name : name;
        });
    };
    return GoogleDriver;
}(Oauth2_1.Oauth2Driver));
exports.GoogleDriver = GoogleDriver;
