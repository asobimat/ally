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
exports.Ally = void 0;
/**
 * Ally allows constructing drivers for a given HTTP request. "use" is the only
 * method we need.
 */
var Ally = /** @class */ (function () {
    function Ally(manager, ctx) {
        this.manager = manager;
        this.ctx = ctx;
        /**
         * All drivers are cached during a given HTTP request
         */
        this.mappingsCache = new Map();
    }
    /**
     * Returns an instance of an ally driver. Driver instances are singleton during
     * a given HTTP request
     */
    Ally.prototype.use = function (provider) {
        if (!this.mappingsCache.has(provider)) {
            this.mappingsCache.set(provider, this.manager.makeMapping(this.ctx, provider));
        }
        return this.mappingsCache.get(provider);
    };
    return Ally;
}());
exports.Ally = Ally;
