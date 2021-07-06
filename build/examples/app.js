"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const http_1 = require("http");
const standalone_1 = require("@adonisjs/core/build/standalone");
async function run() {
    const app = new standalone_1.Application(path_1.join(__dirname, '../'), 'web');
    await app.setup();
    await app.registerProviders();
    await app.bootProviders();
    await app.requirePreloads();
    const server = app.container.use('Adonis/Core/Server');
    server.optimize();
    const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;
    http_1.createServer(server.handle.bind(server)).listen(port);
}
run();
