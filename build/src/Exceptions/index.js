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
exports.OauthException = void 0;
const utils_1 = require("@poppinss/utils");
class OauthException extends utils_1.Exception {
    static missingAuthorizationCode(paramName) {
        return new this(`Cannot request access token. Redirect request is missing the "${paramName}" param`, 500, 'E_OAUTH_MISSING_CODE');
    }
    /**
     * Unable to verify state after redirect
     */
    static stateMisMatch() {
        return new this('Unable to verify re-redirect state', 400, 'E_OAUTH_STATE_MISMATCH');
    }
}
exports.OauthException = OauthException;
