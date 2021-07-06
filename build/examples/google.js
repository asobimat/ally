"use strict";
/*
 * @adonisjs/ally
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Route_1 = __importDefault(require("@ioc:Adonis/Core/Route"));
Route_1.default.get('google', async ({ response }) => {
    return response.send('<a href="/google/redirect"> Login with Google </a>');
});
Route_1.default.get('/google/redirect', async ({ ally }) => {
    return ally.use('google').redirect();
});
Route_1.default.get('/google/callback', async ({ ally }) => {
    try {
        const google = ally.use('google');
        if (google.accessDenied()) {
            return 'Access was denied';
        }
        if (google.stateMisMatch()) {
            return 'Request expired. Retry again';
        }
        if (google.hasError()) {
            return google.getError();
        }
        const user = await google.user();
        return user;
    }
    catch (error) {
        console.log({ error: error.response });
        throw error;
    }
});
