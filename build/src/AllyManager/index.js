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
exports.AllyManager = void 0;
const utils_1 = require("@poppinss/utils");
const Ally_1 = require("../Ally");
/**
 * Manages the lifecycle of ally drivers and instantiates new instances
 * for a given HTTP request
 */
class AllyManager {
    constructor(application, config) {
        this.application = application;
        this.config = config;
        /**
         * Extended set of ally drivers
         */
        this.extendedDrivers = new Map();
    }
    /**
     * Returns the config for a given mapping from the config file
     */
    getMappingConfig(name) {
        const config = this.config[name];
        if (!config) {
            throw new utils_1.Exception(`Missing config for social provider "${name}". Make sure it is defined inside the "config/ally" file`);
        }
        if (!config.driver) {
            throw new utils_1.Exception(`Missing driver property on "${name}" provider config`);
        }
        return config;
    }
    /**
     * Make the discord driver
     */
    makeDiscord(config, ctx) {
        const { DiscordDriver } = require('../Drivers/Discord');
        return new DiscordDriver(ctx, config);
    }
    /**
     * Make the github driver
     */
    makeGithub(config, ctx) {
        const { GithubDriver } = require('../Drivers/Github');
        return new GithubDriver(ctx, config);
    }
    /**
     * Make the twitter driver
     */
    makeTwitter(config, ctx) {
        const { TwitterDriver } = require('../Drivers/Twitter');
        return new TwitterDriver(ctx, config);
    }
    /**
     * Make the google driver
     */
    makeGoogle(config, ctx) {
        const { GoogleDriver } = require('../Drivers/Google');
        return new GoogleDriver(ctx, config);
    }
    /**
     * Make the linkedin driver
     */
    makeLinkedIn(config, ctx) {
        const { LinkedInDriver } = require('../Drivers/LinkedIn');
        return new LinkedInDriver(ctx, config);
    }
    /**
     * Make the facebook driver
     */
    makeFacebook(config, ctx) {
        const { FacebookDriver } = require('../Drivers/Facebook');
        return new FacebookDriver(ctx, config);
    }
    /**
     * Make the spotify driver
     */
    makeSpotify(config, ctx) {
        const { SpotifyDriver } = require('../Drivers/Spotify');
        return new SpotifyDriver(ctx, config);
    }
    /**
     * Makes an instance of the extended driver
     */
    makeExtendedDriver(mapping, config, ctx) {
        const extendedCallback = this.extendedDrivers.get(config.driver);
        if (typeof extendedCallback === 'function') {
            return extendedCallback(this, mapping, config, ctx);
        }
        throw new utils_1.Exception(`Unknown ally driver "${config.driver}"`);
    }
    /**
     * Returns an instance of a mapping
     */
    makeMappingInstance(mapping, ctx) {
        const config = this.getMappingConfig(mapping);
        switch (config.driver) {
            case 'discord':
                return this.makeDiscord(config, ctx);
            case 'github':
                return this.makeGithub(config, ctx);
            case 'twitter':
                return this.makeTwitter(config, ctx);
            case 'google':
                return this.makeGoogle(config, ctx);
            case 'linkedin':
                return this.makeLinkedIn(config, ctx);
            case 'facebook':
                return this.makeFacebook(config, ctx);
            case 'spotify':
                return this.makeSpotify(config, ctx);
            default:
                return this.makeExtendedDriver(mapping, config, ctx);
        }
    }
    /**
     * Makes an instance of a given mapping
     */
    makeMapping(ctx, mapping) {
        return this.makeMappingInstance(mapping, ctx);
    }
    /**
     * Returns an instance of ally, which can be later used to
     * get instances of social providers for a given request
     */
    getAllyForRequest(ctx) {
        return new Ally_1.Ally(this, ctx);
    }
    /**
     * Add a new custom ally driver
     */
    extend(driverName, callback) {
        if (typeof callback !== 'function') {
            throw new utils_1.Exception('"Ally.extend" expects callback to be a function');
        }
        this.extendedDrivers.set(driverName, callback);
    }
}
exports.AllyManager = AllyManager;
