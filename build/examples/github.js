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
Route_1.default.get('github', async ({ response }) => {
    return response.send('<a href="/github/redirect"> Login with Github </a>');
});
Route_1.default.get('/github/redirect', async ({ ally }) => {
    return ally.use('github').redirect((request) => {
        request.scopes(['read:user']);
    });
});
Route_1.default.get('/github/callback', async ({ ally }) => {
    try {
        const gh = ally.use('github');
        if (gh.accessDenied()) {
            return 'Access was denied';
        }
        if (gh.stateMisMatch()) {
            return 'Request expired. Retry again';
        }
        if (gh.hasError()) {
            return gh.getError();
        }
        const user = await gh.user();
        return user;
    }
    catch (error) {
        console.log({ error: error.response });
        throw error;
    }
});
