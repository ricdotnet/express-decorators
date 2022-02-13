"use strict";
exports.__esModule = true;
exports.ResponseHandler = void 0;
/**
 * Response constructor
 */
var ResponseHandler = /** @class */ (function () {
    function ResponseHandler(response) {
        this._code = 0;
        this._response = response;
    }
    ResponseHandler.prototype.status = function (code) {
        // this._response?.status(code);
        this._code = code;
        return this;
    };
    ResponseHandler.prototype.send = function (body, code) {
        if (!this._response.headersSent)
            this._response.status(this._code | code).send(body);
        return this;
    };
    ResponseHandler.prototype.end = function () {
        return this._response.end();
    };
    return ResponseHandler;
}());
exports.ResponseHandler = ResponseHandler;
