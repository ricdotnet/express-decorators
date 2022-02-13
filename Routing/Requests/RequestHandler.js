"use strict";
exports.__esModule = true;
exports.RequestHandler = void 0;
/**
 * Request constructor
 */
var RequestHandler = /** @class */ (function () {
    function RequestHandler(request) {
        this._request = request;
    }
    RequestHandler.prototype.headers = function () {
        return this._request.headers;
    };
    /**
     * Setter to set any custom data that we want to pass from the middlewares.
     * @param arg
     */
    // setData(args: { [key: string]: any }) {
    //   for (const arg in args) {
    //     this._request![arg] = args[arg];
    //   }
    // }
    //
    // getData(key: string) {
    //   return this._request![key];
    // }
    RequestHandler.prototype.data = function (arg) {
        if (typeof arg === "object") {
            for (var a in arg) {
                this._request[a] = arg[a];
            }
            return;
        }
        if (arg)
            return this._request[arg];
    };
    /**
     * We use any as the return type because we can pass anything as a parameter and we want to be able
     *  to destructure an object in the route method.
     */
    RequestHandler.prototype.parameters = function (p) {
        if (p === 'all')
            return this._request.params;
        return this._request.params[p];
    };
    /**
     * We need sometimes to get the queries from the url so we use this method.
     * api.unispaces.uk/endpoint?key=value&key=value&key=value
     */
    RequestHandler.prototype.query = function (q) {
        if (q === 'all')
            return this._request.query;
        return this._request.query[q];
    };
    /**
     * Return the request body
     * TODO: maybe make it not return anything if there is no body 🤔
     */
    RequestHandler.prototype.body = function (key) {
        return this._request.body || this._request.body[key];
    };
    RequestHandler.prototype.method = function () {
        return this._request.method;
    };
    /**
     * We use this to get the token from the headers once it gets validated by the auth middleware
     *
     * THIS WILL ONLY BE CALLED WHEN THERE IS A TOKEN!!!
     */
    RequestHandler.prototype.token = function () {
        return this.headers().authorization.split(' ')[1];
        // return this.headers.authorization.split(' ')[1];
    };
    return RequestHandler;
}());
exports.RequestHandler = RequestHandler;
