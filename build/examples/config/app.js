"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = exports.http = exports.appKey = void 0;
exports.appKey = 'averylongrandomsecretkey';
exports.http = {
    trustProxy: () => true,
    cookie: {},
};
exports.logger = {
    enabled: true,
    level: 'trace',
};
