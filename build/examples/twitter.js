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
Route_1.default.get('twitter', async ({ response }) => {
    return response.send('<a href="/twitter/redirect"> Login with twitter </a>');
});
Route_1.default.get('/twitter/redirect', async ({ ally }) => {
    return ally.use('twitter').redirect();
});
Route_1.default.get('/twitter/callback', async ({ ally, request }) => {
    console.log(request.cookiesList());
    try {
        const twitter = ally.use('twitter');
        if (twitter.accessDenied()) {
            return 'Access was denied';
        }
        if (twitter.hasError()) {
            return twitter.getError();
        }
        if (twitter.stateMisMatch()) {
            return 'Request expired. Retry again';
        }
        const user = await twitter.user();
        return user;
    }
    catch (error) {
        console.log({ error: error.response });
        throw error;
    }
});
