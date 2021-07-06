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
Route_1.default.get('facebook', async ({ response }) => {
    return response.send('<a href="/facebook/redirect"> Login with facebook </a>');
});
Route_1.default.get('/facebook/redirect', async ({ ally }) => {
    return ally.use('facebook').redirect((request) => {
        request.scopes(['email']);
    });
});
Route_1.default.get('/facebook/callback', async ({ ally }) => {
    try {
        const facebook = ally.use('facebook');
        if (facebook.accessDenied()) {
            return 'Access was denied';
        }
        if (facebook.stateMisMatch()) {
            return 'Request expired. Retry again';
        }
        if (facebook.hasError()) {
            return facebook.getError();
        }
        const user = await facebook.user();
        return user;
    }
    catch (error) {
        console.log({ error: error.response });
        throw error;
    }
});
