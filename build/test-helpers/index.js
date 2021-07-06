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
exports.setup = exports.fs = void 0;
const path_1 = require("path");
const dev_utils_1 = require("@poppinss/dev-utils");
const standalone_1 = require("@adonisjs/core/build/standalone");
exports.fs = new dev_utils_1.Filesystem(path_1.join(__dirname, '__app'));
async function setup(setupProviders) {
    const application = new standalone_1.Application(exports.fs.basePath, 'web', {
        providers: ['@adonisjs/core', '../../providers/AllyProvider'],
    });
    await exports.fs.add('config/app.ts', `
    export const profiler = { enabled: true }
    export const appKey = 'averylongrandomsecretkey'
    export const http = {
      trustProxy: () => {},
      cookie: {}
    }
  `);
    await application.setup();
    if (setupProviders) {
        await application.registerProviders();
        await application.bootProviders();
    }
    return application;
}
exports.setup = setup;
