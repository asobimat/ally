/// <reference path="../adonis-typings/index.d.ts" />
/// <reference types="@adonisjs/application/build/adonis-typings" />
import { ApplicationContract } from '@ioc:Adonis/Core/Application';
/**
 * Ally provider to hook into an AdonisJS application
 */
export default class AllyProvider {
    private application;
    protected static needsApplication: boolean;
    constructor(application: ApplicationContract);
    /**
     * Register the binding
     */
    register(): void;
    /**
     * Stick an instance to the current HTTP request
     */
    boot(): void;
}
