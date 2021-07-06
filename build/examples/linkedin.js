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
Route_1.default.get('linkedin', async ({ response }) => {
    return response.send('<a href="/linkedin/redirect"> Login with linkedin </a>');
});
Route_1.default.get('/linkedin/redirect', async ({ ally }) => {
    return ally.use('linkedin').redirect();
});
Route_1.default.get('/linkedin/callback', async ({ ally }) => {
    try {
        const linkedin = ally.use('linkedin');
        if (linkedin.accessDenied()) {
            return 'Access was denied';
        }
        if (linkedin.stateMisMatch()) {
            return 'Request expired. Retry again';
        }
        if (linkedin.hasError()) {
            return linkedin.getError();
        }
        const user = await linkedin.user();
        return user;
    }
    catch (error) {
        console.log({ error: error.response });
        throw error;
    }
});
