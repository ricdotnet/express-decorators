"use strict";
exports.__esModule = true;
exports.RequestContext = void 0;
var index_1 = require("../index");
// export type RequestRoute = (req: Request, res: Response, next: NextFunction) => any;
var RequestContext = /** @class */ (function () {
    function RequestContext() {
    }
    /**
     * Initiate a middleware for the decorators
     * @param request
     * @param response
     * @param next
     */
    RequestContext.prototype.initRouter = function (request, response, next) {
        RequestContext._request = request;
        RequestContext._response = response;
        next();
    };
    RequestContext.request = function () {
        return new index_1.RequestHandler(RequestContext._request);
    };
    RequestContext.response = function () {
        return new index_1.ResponseHandler(RequestContext._response);
    };
    return RequestContext;
}());
exports.RequestContext = RequestContext;
