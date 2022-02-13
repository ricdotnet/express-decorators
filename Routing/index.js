"use strict";
exports.__esModule = true;
exports.query = exports.param = exports.respond = exports.response = exports.request = exports.ResponseHandler = exports.RequestHandler = exports.RequestContext = void 0;
var RequestHandler_1 = require("./Requests/RequestHandler");
exports.RequestHandler = RequestHandler_1.RequestHandler;
var RequestContext_1 = require("./Requests/RequestContext");
exports.RequestContext = RequestContext_1.RequestContext;
var ResponseHandler_1 = require("./Requests/ResponseHandler");
exports.ResponseHandler = ResponseHandler_1.ResponseHandler;
function request() {
    return RequestContext_1.RequestContext.request();
}
exports.request = request;
function response() {
    return RequestContext_1.RequestContext.response();
}
exports.response = response;
function respond(body, code) {
    return {
        code: code,
        body: {
            body: body
        }
    };
}
exports.respond = respond;
/**
 * We use this method to retrieve a parameter from the url
 * @param p
 */
function param(p) {
    if (p === void 0) { p = 'all'; }
    return request().parameters(p);
}
exports.param = param;
function query(q) {
    if (q === void 0) { q = 'all'; }
    return request().query(q);
}
exports.query = query;
