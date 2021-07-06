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
const AllyManager_1 = require("../src/AllyManager");
/**
 * Ally provider to hook into an AdonisJS application
 */
class AllyProvider {
    constructor(application) {
        this.application = application;
    }
    /**
     * Register the binding
     */
    register() {
        this.application.container.singleton('Adonis/Addons/Ally', (container) => {
            const config = container.resolveBinding('Adonis/Core/Config').get('ally', {});
            return new AllyManager_1.AllyManager(this.application, config);
        });
    }
    /**
     * Stick an instance to the current HTTP request
     */
    boot() {
        this.application.container.withBindings(['Adonis/Core/HttpContext', 'Adonis/Addons/Ally'], (HttpContext, Ally) => {
            HttpContext.getter('ally', function ally() {
                return Ally.getAllyForRequest(this);
            }, true);
        });
    }
}
exports.default = AllyProvider;
AllyProvider.needsApplication = true;
