/// <reference types="@adonisjs/application/build/adonis-typings" />
import { ApplicationContract } from '@ioc:Adonis/Core/Application';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { AllyContract, SocialProviders, GithubDriverConfig, AllyManagerContract, ExtendDriverCallback, DiscordDriverConfig, TwitterDriverConfig, GoogleDriverConfig, LinkedInDriverConfig, FacebookDriverConfig, SpotifyDriverConfig } from '@ioc:Adonis/Addons/Ally';
/**
 * Manages the lifecycle of ally drivers and instantiates new instances
 * for a given HTTP request
 */
export declare class AllyManager implements AllyManagerContract {
    application: ApplicationContract;
    private config;
    /**
     * Extended set of ally drivers
     */
    private extendedDrivers;
    constructor(application: ApplicationContract, config: any);
    /**
     * Returns the config for a given mapping from the config file
     */
    protected getMappingConfig(name: string): any;
    /**
     * Make the discord driver
     */
    protected makeDiscord(config: DiscordDriverConfig, ctx: HttpContextContract): any;
    /**
     * Make the github driver
     */
    protected makeGithub(config: GithubDriverConfig, ctx: HttpContextContract): any;
    /**
     * Make the twitter driver
     */
    protected makeTwitter(config: TwitterDriverConfig, ctx: HttpContextContract): any;
    /**
     * Make the google driver
     */
    protected makeGoogle(config: GoogleDriverConfig, ctx: HttpContextContract): any;
    /**
     * Make the linkedin driver
     */
    protected makeLinkedIn(config: LinkedInDriverConfig, ctx: HttpContextContract): any;
    /**
     * Make the facebook driver
     */
    protected makeFacebook(config: FacebookDriverConfig, ctx: HttpContextContract): any;
    /**
     * Make the spotify driver
     */
    protected makeSpotify(config: SpotifyDriverConfig, ctx: HttpContextContract): any;
    /**
     * Makes an instance of the extended driver
     */
    protected makeExtendedDriver(mapping: string, config: any, ctx: HttpContextContract): any;
    /**
     * Returns an instance of a mapping
     */
    protected makeMappingInstance(mapping: string, ctx: HttpContextContract): any;
    /**
     * Makes an instance of a given mapping
     */
    makeMapping(ctx: HttpContextContract, mapping: keyof SocialProviders): any;
    /**
     * Returns an instance of ally, which can be later used to
     * get instances of social providers for a given request
     */
    getAllyForRequest(ctx: HttpContextContract): AllyContract;
    /**
     * Add a new custom ally driver
     */
    extend(driverName: string, callback: ExtendDriverCallback): void;
}
