"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.RegisterRoutes = void 0;
var express_1 = require("express");
var node_dir_1 = require("node-dir");
require("reflect-metadata");
var path = require("path");
var Routing_1 = require("./Routing");
var RegisterRoutes = /** @class */ (function () {
    function RegisterRoutes(app, dir) {
        this.apiRoutes = (0, express_1.Router)();
        this.app = app;
        this.dir = dir;
        this.register();
    }
    RegisterRoutes.prototype.register = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.registerControllers()];
                    case 1:
                        _a.sent();
                        this.registerRoutes();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * This can be refactored to fetch all controllers and register them in the main route.
     * That can be achieved by reading all the files in the Api (to be renamed Controllers) folder.
     * @private
     */
    RegisterRoutes.getControllers = function (dir) {
        return __awaiter(this, void 0, void 0, function () {
            var controllerFiles, controllers, _i, controllerFiles_1, c, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        controllerFiles = (0, node_dir_1.files)(path.join(process.cwd(), dir), { sync: true });
                        controllers = [];
                        _i = 0, controllerFiles_1 = controllerFiles;
                        _c.label = 1;
                    case 1:
                        if (!(_i < controllerFiles_1.length)) return [3 /*break*/, 4];
                        c = controllerFiles_1[_i];
                        if (!c) return [3 /*break*/, 3];
                        _b = (_a = controllers).push;
                        return [4 /*yield*/, Promise.resolve().then(function () { return require(c); })];
                    case 2:
                        _b.apply(_a, [_c.sent()]);
                        _c.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/, controllers];
                }
            });
        });
    };
    /**
     * TODO: Maybe this needs some refactoring 🤔
     * Look horrible but it works alright
     */
    RegisterRoutes.prototype.registerControllers = function () {
        return __awaiter(this, void 0, void 0, function () {
            var controllers, _loop_1, this_1, _i, controllers_1, controller;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, RegisterRoutes.getControllers(this.dir)];
                    case 1:
                        controllers = _a.sent();
                        _loop_1 = function (controller) {
                            // (await Api.getControllers()).forEach((controller) => {
                            var group = (0, express_1.Router)();
                            // const Controller = new controller();
                            var c = Object.values(controller)[0];
                            var controllerData = Reflect.getMetadata('controller', c);
                            // this.apiRoutes.use(path, Controller.route);
                            // This
                            var methodRoutes = Reflect.getMetadata('method', c);
                            // the next if statement is to make sure the booter does not crash if a controller has no methods
                            // UNI-29
                            if (methodRoutes) {
                                methodRoutes.forEach(function (route) {
                                    if (route.middlewares) {
                                        group[route.method].apply(group, [route.path, route.middlewares, route.target]);
                                    }
                                    else {
                                        group[route.method].apply(group, [route.path, route.target]);
                                    }
                                });
                            }
                            // This will register a global middleware defined on the @Controller decorator
                            if (controllerData.middlewares) {
                                this_1.apiRoutes.use(controllerData.path, controllerData.middlewares, group);
                            }
                            else {
                                this_1.apiRoutes.use(controllerData.path, group);
                            }
                        };
                        this_1 = this;
                        for (_i = 0, controllers_1 = controllers; _i < controllers_1.length; _i++) {
                            controller = controllers_1[_i];
                            _loop_1(controller);
                        }
                        return [2 /*return*/, this];
                }
            });
        });
    };
    RegisterRoutes.prototype.registerRoutes = function () {
        this.app.use('/', new Routing_1.RequestContext().initRouter);
        this.app.use('/', this.apiRoutes);
    };
    return RegisterRoutes;
}());
exports.RegisterRoutes = RegisterRoutes;
