"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Route_1 = __importDefault(require("@ioc:Adonis/Core/Route"));
Route_1.default.get('spotify', async ({ response }) => {
    return response.send('<a href="/spotify/redirect"> Login with spotify </a>');
});
Route_1.default.get('/spotify/redirect', async ({ ally }) => {
    return ally.use('spotify').redirect((request) => {
        request.scopes(['user-read-email']);
    });
});
Route_1.default.get('/spotify/callback', async ({ ally }) => {
    try {
        const spotify = ally.use('spotify');
        if (spotify.accessDenied()) {
            return 'Access was denied';
        }
        if (spotify.stateMisMatch()) {
            return 'Request expired. Retry again';
        }
        if (spotify.hasError()) {
            return spotify.getError();
        }
        const user = await spotify.user();
        return user;
    }
    catch (error) {
        console.log({ error: error.response });
        throw error;
    }
});
