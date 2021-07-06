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
Route_1.default.get('discord', async ({ response }) => {
    return response.send('<a href="/discord/redirect"> Login with Discord</a>');
});
Route_1.default.get('/discord/redirect', async ({ ally }) => {
    return ally.use('discord').redirect((request) => {
        request.scopes(['identify', 'guilds']);
    });
});
Route_1.default.get('/discord/callback', async ({ ally }) => {
    try {
        const discord = ally.use('discord');
        if (discord.accessDenied()) {
            return 'Access was denied';
        }
        if (discord.stateMisMatch()) {
            return 'Request expired. Retry again';
        }
        if (discord.hasError()) {
            return discord.getError();
        }
        const user = await discord.user();
        return user;
    }
    catch (error) {
        console.log({ error: error.response });
        throw error;
    }
});
