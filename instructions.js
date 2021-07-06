"use strict";
/*
 * @adonisjs/ally
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
exports.__esModule = true;
var path_1 = require("path");
/**
 * Base path to config stub partials
 */
var CONFIG_PARTIALS_BASE = './config/partials';
/**
 * Prompt choices for the provider selection
 */
var PROVIDER_PROMPT_CHOICES = [
    {
        name: 'github',
        message: 'Github'
    },
    {
        name: 'google',
        message: 'Google'
    },
    {
        name: 'twitter',
        message: 'Twitter'
    },
    {
        name: 'discord',
        message: 'Discord'
    },
    {
        name: 'linkedin',
        message: 'LinkedIn'
    },
    {
        name: 'facebook',
        message: 'Facebook'
    },
    {
        name: 'spotify',
        message: 'Spotify'
    },
];
/**
 * Environment variables for available providers
 */
var ENV_VARS = {
    github: {
        clientId: 'GITHUB_CLIENT_ID',
        clientSecret: 'GITHUB_CLIENT_SECRET'
    },
    google: {
        clientId: 'GOOGLE_CLIENT_ID',
        clientSecret: 'GOOGLE_CLIENT_SECRET'
    },
    twitter: {
        clientId: 'TWITTER_CLIENT_ID',
        clientSecret: 'TWITTER_CLIENT_SECRET'
    },
    discord: {
        clientId: 'DISCORD_CLIENT_ID',
        clientSecret: 'DISCORD_CLIENT_SECRET'
    },
    linkedin: {
        clientId: 'LINKEDIN_CLIENT_ID',
        clientSecret: 'LINKEDIN_CLIENT_SECRET'
    },
    facebook: {
        clientId: 'FACEBOOK_CLIENT_ID',
        clientSecret: 'FACEBOOK_CLIENT_SECRET'
    },
    spotify: {
        clientId: 'SPOTIFY_CLIENT_ID',
        clientSecret: 'SPOTIFY_CLIENT_SECRET'
    }
};
/**
 * Returns absolute path to the stub relative from the templates
 * directory
 */
function getStub() {
    var relativePaths = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        relativePaths[_i] = arguments[_i];
    }
    return path_1.join.apply(void 0, __spreadArray([__dirname, 'templates'], relativePaths));
}
/**
 * Creates the contract file
 */
function makeContract(projectRoot, app, sink, state) {
    var contractsDirectory = app.directoriesMap.get('contracts') || 'contracts';
    var contractPath = path_1.join(contractsDirectory, 'ally.ts');
    var template = new sink.files.MustacheFile(projectRoot, contractPath, getStub('contracts/ally.txt'));
    template.overwrite = true;
    template.apply(state).commit();
    sink.logger.action('create').succeeded(contractPath);
}
/**
 * Makes the auth config file
 */
function makeConfig(projectRoot, app, sink, state) {
    var configDirectory = app.directoriesMap.get('config') || 'config';
    var configPath = path_1.join(configDirectory, 'ally.ts');
    var template = new sink.files.MustacheFile(projectRoot, configPath, getStub('config/ally.txt'));
    template.overwrite = true;
    /**
     * Compute partials from selected providers
     */
    var partials = {};
    Object.keys(state.providers).forEach(function (provider) {
        if (state.providers[provider] === true) {
            partials[provider + "_provider"] = getStub(CONFIG_PARTIALS_BASE, provider + ".txt");
        }
    });
    template.apply(state).partials(partials).commit();
    sink.logger.action('create').succeeded(configPath);
}
/**
 * Define environment variables based upon user selection
 */
function defineEnvVars(projectRoot, sink, state) {
    var env = new sink.files.EnvFile(projectRoot);
    Object.keys(state.providers).forEach(function (provider) {
        if (state.providers[provider] === true) {
            env.set(state.envVars[provider].clientId, 'clientId');
            env.set(state.envVars[provider].clientSecret, 'clientSecret');
        }
        else {
            env.unset(state.envVars[provider].clientId);
            env.unset(state.envVars[provider].clientSecret);
        }
    });
    env.commit();
    sink.logger.action('update').succeeded('.env,.env.example');
}
/**
 * Prompts user to select the provider
 */
function getProvider(sink) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, sink
                    .getPrompt()
                    .multiple('Select social providers you are planning to use', PROVIDER_PROMPT_CHOICES, {
                    validate: function (choice) {
                        return choice && choice.length ? true : 'Select at least one provider';
                    }
                })];
        });
    });
}
/**
 * Instructions to be executed when setting up the package.
 */
function instructions(projectRoot, app, sink) {
    return __awaiter(this, void 0, void 0, function () {
        var state, selectedProviders;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    state = {
                        providers: {
                            github: false,
                            google: false,
                            twitter: false,
                            discord: false,
                            linkedin: false,
                            facebook: false,
                            spotify: false
                        },
                        envVars: ENV_VARS
                    };
                    return [4 /*yield*/, getProvider(sink)];
                case 1:
                    selectedProviders = _a.sent();
                    state.providers.discord = selectedProviders.includes('discord');
                    state.providers.github = selectedProviders.includes('github');
                    state.providers.google = selectedProviders.includes('google');
                    state.providers.twitter = selectedProviders.includes('twitter');
                    state.providers.linkedin = selectedProviders.includes('linkedin');
                    state.providers.facebook = selectedProviders.includes('facebook');
                    state.providers.spotify = selectedProviders.includes('spotify');
                    /**
                     * Make contract file
                     */
                    makeContract(projectRoot, app, sink, state);
                    /**
                     * Make config file
                     */
                    makeConfig(projectRoot, app, sink, state);
                    /**
                     * Define env vars
                     */
                    defineEnvVars(projectRoot, sink, state);
                    return [2 /*return*/];
            }
        });
    });
}
exports["default"] = instructions;
