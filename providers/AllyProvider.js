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
var AllyManager_1 = require("../src/AllyManager");
/**
 * Ally provider to hook into an AdonisJS application
 */
var AllyProvider = /** @class */ (function () {
    function AllyProvider(application) {
        this.application = application;
    }
    /**
     * Register the binding
     */
    AllyProvider.prototype.register = function () {
        var _this = this;
        this.application.container.singleton('Adonis/Addons/Ally', function (container) {
            var config = container.resolveBinding('Adonis/Core/Config').get('ally', {});
            return new AllyManager_1.AllyManager(_this.application, config);
        });
    };
    /**
     * Stick an instance to the current HTTP request
     */
    AllyProvider.prototype.boot = function () {
        this.application.container.withBindings(['Adonis/Core/HttpContext', 'Adonis/Addons/Ally'], function (HttpContext, Ally) {
            HttpContext.getter('ally', function ally() {
                return Ally.getAllyForRequest(this);
            }, true);
        });
    };
    AllyProvider.needsApplication = true;
    return AllyProvider;
}());
exports["default"] = AllyProvider;
