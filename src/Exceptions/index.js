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
exports.OauthException = void 0;
var utils_1 = require("@poppinss/utils");
var OauthException = /** @class */ (function (_super) {
    __extends(OauthException, _super);
    function OauthException() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    OauthException.missingAuthorizationCode = function (paramName) {
        return new this("Cannot request access token. Redirect request is missing the \"" + paramName + "\" param", 500, 'E_OAUTH_MISSING_CODE');
    };
    /**
     * Unable to verify state after redirect
     */
    OauthException.stateMisMatch = function () {
        return new this('Unable to verify re-redirect state', 400, 'E_OAUTH_STATE_MISMATCH');
    };
    return OauthException;
}(utils_1.Exception));
exports.OauthException = OauthException;
