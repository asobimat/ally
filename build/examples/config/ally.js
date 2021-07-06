"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Env_1 = __importDefault(require("@ioc:Adonis/Core/Env"));
const allyConfig = {
    discord: {
        driver: 'discord',
        clientId: Env_1.default.get('DISCORD_CLIENT_ID'),
        clientSecret: Env_1.default.get('DISCORD_CLIENT_SECRET'),
        callbackUrl: `http://localhost:${Env_1.default.get('PORT')}/discord/callback`,
    },
    google: {
        driver: 'google',
        clientId: Env_1.default.get('GOOGLE_CLIENT_ID'),
        clientSecret: Env_1.default.get('GOOGLE_CLIENT_SECRET'),
        callbackUrl: `http://localhost:${Env_1.default.get('PORT')}/google/callback`,
    },
    github: {
        driver: 'github',
        clientId: Env_1.default.get('GITHUB_CLIENT_ID'),
        clientSecret: Env_1.default.get('GITHUB_CLIENT_SECRET'),
        callbackUrl: `http://localhost:${Env_1.default.get('PORT')}/github/callback`,
    },
    linkedin: {
        driver: 'linkedin',
        clientId: Env_1.default.get('LINKEDIN_CLIENT_ID'),
        clientSecret: Env_1.default.get('LINKEDIN_CLIENT_SECRET'),
        callbackUrl: `http://localhost:${Env_1.default.get('PORT')}/linkedin/callback`,
    },
    twitter: {
        driver: 'twitter',
        clientId: Env_1.default.get('TWITTER_API_KEY'),
        clientSecret: Env_1.default.get('TWITTER_APP_SECRET'),
        callbackUrl: `http://localhost:${Env_1.default.get('PORT')}/twitter/callback`,
    },
    facebook: {
        driver: 'facebook',
        clientId: Env_1.default.get('FACEBOOK_CLIENT_ID'),
        clientSecret: Env_1.default.get('FACEBOOK_CLIENT_SECRET'),
        callbackUrl: `http://localhost:${Env_1.default.get('PORT')}/facebook/callback`,
    },
    spotify: {
        driver: 'spotify',
        clientId: Env_1.default.get('SPOTIFY_CLIENT_ID'),
        clientSecret: Env_1.default.get('SPOTIFY_CLIENT_SECRET'),
        callbackUrl: `http://localhost:${Env_1.default.get('PORT')}/spotify/callback`,
    },
};
exports.default = allyConfig;
