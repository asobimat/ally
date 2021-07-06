"use strict";
/*
 * @adonisjs/ally
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
exports.__esModule = true;
exports.RedirectRequest = exports.Oauth2Driver = exports.OauthException = exports.ApiRequest = void 0;
/**
 * Exports required to create a custom driver
 */
var oauth_client_1 = require("@poppinss/oauth-client");
__createBinding(exports, oauth_client_1, "HttpClient", "ApiRequest");
var Exceptions_1 = require("./src/Exceptions");
__createBinding(exports, Exceptions_1, "OauthException");
var Oauth2_1 = require("./src/AbstractDrivers/Oauth2");
__createBinding(exports, Oauth2_1, "Oauth2Driver");
var RedirectRequest_1 = require("./src/RedirectRequest");
__createBinding(exports, RedirectRequest_1, "RedirectRequest");
