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
const path_1 = require("path");
/**
 * Base path to config stub partials
 */
const CONFIG_PARTIALS_BASE = './config/partials';
/**
 * Prompt choices for the provider selection
 */
const PROVIDER_PROMPT_CHOICES = [
    {
        name: 'github',
        message: 'Github',
    },
    {
        name: 'google',
        message: 'Google',
    },
    {
        name: 'twitter',
        message: 'Twitter',
    },
    {
        name: 'discord',
        message: 'Discord',
    },
    {
        name: 'linkedin',
        message: 'LinkedIn',
    },
    {
        name: 'facebook',
        message: 'Facebook',
    },
    {
        name: 'spotify',
        message: 'Spotify',
    },
];
/**
 * Environment variables for available providers
 */
const ENV_VARS = {
    github: {
        clientId: 'GITHUB_CLIENT_ID',
        clientSecret: 'GITHUB_CLIENT_SECRET',
    },
    google: {
        clientId: 'GOOGLE_CLIENT_ID',
        clientSecret: 'GOOGLE_CLIENT_SECRET',
    },
    twitter: {
        clientId: 'TWITTER_CLIENT_ID',
        clientSecret: 'TWITTER_CLIENT_SECRET',
    },
    discord: {
        clientId: 'DISCORD_CLIENT_ID',
        clientSecret: 'DISCORD_CLIENT_SECRET',
    },
    linkedin: {
        clientId: 'LINKEDIN_CLIENT_ID',
        clientSecret: 'LINKEDIN_CLIENT_SECRET',
    },
    facebook: {
        clientId: 'FACEBOOK_CLIENT_ID',
        clientSecret: 'FACEBOOK_CLIENT_SECRET',
    },
    spotify: {
        clientId: 'SPOTIFY_CLIENT_ID',
        clientSecret: 'SPOTIFY_CLIENT_SECRET',
    },
};
/**
 * Returns absolute path to the stub relative from the templates
 * directory
 */
function getStub(...relativePaths) {
    return path_1.join(__dirname, 'templates', ...relativePaths);
}
/**
 * Creates the contract file
 */
function makeContract(projectRoot, app, sink, state) {
    const contractsDirectory = app.directoriesMap.get('contracts') || 'contracts';
    const contractPath = path_1.join(contractsDirectory, 'ally.ts');
    const template = new sink.files.MustacheFile(projectRoot, contractPath, getStub('contracts/ally.txt'));
    template.overwrite = true;
    template.apply(state).commit();
    sink.logger.action('create').succeeded(contractPath);
}
/**
 * Makes the auth config file
 */
function makeConfig(projectRoot, app, sink, state) {
    const configDirectory = app.directoriesMap.get('config') || 'config';
    const configPath = path_1.join(configDirectory, 'ally.ts');
    const template = new sink.files.MustacheFile(projectRoot, configPath, getStub('config/ally.txt'));
    template.overwrite = true;
    /**
     * Compute partials from selected providers
     */
    const partials = {};
    Object.keys(state.providers).forEach((provider) => {
        if (state.providers[provider] === true) {
            partials[`${provider}_provider`] = getStub(CONFIG_PARTIALS_BASE, `${provider}.txt`);
        }
    });
    template.apply(state).partials(partials).commit();
    sink.logger.action('create').succeeded(configPath);
}
/**
 * Define environment variables based upon user selection
 */
function defineEnvVars(projectRoot, sink, state) {
    const env = new sink.files.EnvFile(projectRoot);
    Object.keys(state.providers).forEach((provider) => {
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
async function getProvider(sink) {
    return sink
        .getPrompt()
        .multiple('Select social providers you are planning to use', PROVIDER_PROMPT_CHOICES, {
        validate(choice) {
            return choice && choice.length ? true : 'Select at least one provider';
        },
    });
}
/**
 * Instructions to be executed when setting up the package.
 */
async function instructions(projectRoot, app, sink) {
    const state = {
        providers: {
            github: false,
            google: false,
            twitter: false,
            discord: false,
            linkedin: false,
            facebook: false,
            spotify: false,
        },
        envVars: ENV_VARS,
    };
    const selectedProviders = await getProvider(sink);
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
}
exports.default = instructions;
