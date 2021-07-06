"use strict";
/*
 * @adonisjs/ally
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const japa_1 = __importDefault(require("japa"));
const Ally_1 = require("../src/Ally");
const AllyManager_1 = require("../src/AllyManager");
const Github_1 = require("../src/Drivers/Github");
const test_helpers_1 = require("../test-helpers");
japa_1.default.group('AllyManager', (group) => {
    group.after(async () => {
        await test_helpers_1.fs.cleanup();
    });
    japa_1.default('make instance of a mapping', async (assert) => {
        const app = await test_helpers_1.setup(true);
        const manager = new AllyManager_1.AllyManager(app, {
            github: {
                driver: 'github',
            },
        });
        const HttpContext = app.container.resolveBinding('Adonis/Core/HttpContext');
        assert.instanceOf(manager.makeMapping(HttpContext.create('/', {}), 'github'), Github_1.GithubDriver);
    });
    japa_1.default('register provider as singleton', async (assert) => {
        const app = await test_helpers_1.setup(true);
        assert.strictEqual(app.container.resolveBinding('Adonis/Addons/Ally'), app.container.resolveBinding('Adonis/Addons/Ally'));
    });
    japa_1.default('add ally getter to http context', async (assert) => {
        const app = await test_helpers_1.setup(true);
        const HttpContext = app.container.resolveBinding('Adonis/Core/HttpContext');
        assert.instanceOf(HttpContext.create('/', {}).ally, Ally_1.Ally);
    });
    japa_1.default('extend ally manager to add custom drivers', async (assert) => {
        const app = await test_helpers_1.setup(true);
        class MyCustomDriver {
        }
        const manager = new AllyManager_1.AllyManager(app, {
            foo: {
                driver: 'foo',
            },
        });
        manager.extend('foo', () => {
            return new MyCustomDriver();
        });
        const HttpContext = app.container.resolveBinding('Adonis/Core/HttpContext');
        assert.instanceOf(manager.makeMapping(HttpContext.create('/', {}), 'foo'), MyCustomDriver);
    });
});
