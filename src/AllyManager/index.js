"use strict";
/*
 * @adonisjs/ally
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
exports.__esModule = true;
exports.AllyManager = void 0;
var utils_1 = require("@poppinss/utils");
var Ally_1 = require("../Ally");
/**
 * Manages the lifecycle of ally drivers and instantiates new instances
 * for a given HTTP request
 */
var AllyManager = /** @class */ (function () {
    function AllyManager(application, config) {
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
    AllyManager.prototype.getMappingConfig = function (name) {
        var config = this.config[name];
        if (!config) {
            throw new utils_1.Exception("Missing config for social provider \"" + name + "\". Make sure it is defined inside the \"config/ally\" file");
        }
        if (!config.driver) {
            throw new utils_1.Exception("Missing driver property on \"" + name + "\" provider config");
        }
        return config;
    };
    /**
     * Make the discord driver
     */
    AllyManager.prototype.makeDiscord = function (config, ctx) {
        var DiscordDriver = require('../Drivers/Discord').DiscordDriver;
        return new DiscordDriver(ctx, config);
    };
    /**
     * Make the github driver
     */
    AllyManager.prototype.makeGithub = function (config, ctx) {
        var GithubDriver = require('../Drivers/Github').GithubDriver;
        return new GithubDriver(ctx, config);
    };
    /**
     * Make the twitter driver
     */
    AllyManager.prototype.makeTwitter = function (config, ctx) {
        var TwitterDriver = require('../Drivers/Twitter').TwitterDriver;
        return new TwitterDriver(ctx, config);
    };
    /**
     * Make the google driver
     */
    AllyManager.prototype.makeGoogle = function (config, ctx) {
        var GoogleDriver = require('../Drivers/Google').GoogleDriver;
        return new GoogleDriver(ctx, config);
    };
    /**
     * Make the linkedin driver
     */
    AllyManager.prototype.makeLinkedIn = function (config, ctx) {
        var LinkedInDriver = require('../Drivers/LinkedIn').LinkedInDriver;
        return new LinkedInDriver(ctx, config);
    };
    /**
     * Make the facebook driver
     */
    AllyManager.prototype.makeFacebook = function (config, ctx) {
        var FacebookDriver = require('../Drivers/Facebook').FacebookDriver;
        return new FacebookDriver(ctx, config);
    };
    /**
     * Make the spotify driver
     */
    AllyManager.prototype.makeSpotify = function (config, ctx) {
        var SpotifyDriver = require('../Drivers/Spotify').SpotifyDriver;
        return new SpotifyDriver(ctx, config);
    };
    /**
     * Makes an instance of the extended driver
     */
    AllyManager.prototype.makeExtendedDriver = function (mapping, config, ctx) {
        var extendedCallback = this.extendedDrivers.get(config.driver);
        if (typeof extendedCallback === 'function') {
            return extendedCallback(this, mapping, config, ctx);
        }
        throw new utils_1.Exception("Unknown ally driver \"" + config.driver + "\"");
    };
    /**
     * Returns an instance of a mapping
     */
    AllyManager.prototype.makeMappingInstance = function (mapping, ctx) {
        var config = this.getMappingConfig(mapping);
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
    };
    /**
     * Makes an instance of a given mapping
     */
    AllyManager.prototype.makeMapping = function (ctx, mapping) {
        return this.makeMappingInstance(mapping, ctx);
    };
    /**
     * Returns an instance of ally, which can be later used to
     * get instances of social providers for a given request
     */
    AllyManager.prototype.getAllyForRequest = function (ctx) {
        return new Ally_1.Ally(this, ctx);
    };
    /**
     * Add a new custom ally driver
     */
    AllyManager.prototype.extend = function (driverName, callback) {
        if (typeof callback !== 'function') {
            throw new utils_1.Exception('"Ally.extend" expects callback to be a function');
        }
        this.extendedDrivers.set(driverName, callback);
    };
    return AllyManager;
}());
exports.AllyManager = AllyManager;
