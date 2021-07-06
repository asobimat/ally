/// <reference path="../../adonis-typings/index.d.ts" />
/// <reference path="../../adonis-typings/ally.d.ts" />
/// <reference path="../../test-helpers/contracts.d.ts" />
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { AllyContract, Oauth2AccessToken, AllyDriverContract, AllyManagerContract } from '@ioc:Adonis/Addons/Ally';
/**
 * Ally allows constructing drivers for a given HTTP request. "use" is the only
 * method we need.
 */
export declare class Ally implements AllyContract {
    private manager;
    private ctx;
    /**
     * All drivers are cached during a given HTTP request
     */
    private mappingsCache;
    constructor(manager: AllyManagerContract, ctx: HttpContextContract);
    /**
     * Returns an instance of an ally driver. Driver instances are singleton during
     * a given HTTP request
     */
    use(provider: string): AllyDriverContract<Oauth2AccessToken | import("@ioc:Adonis/Addons/Ally").Oauth1RequestToken, string>;
}
