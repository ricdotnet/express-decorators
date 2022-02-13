import { NextFunction, Request, Response } from 'express';
import { RequestHandler, ResponseHandler } from '../index';
export declare class RequestContext {
    static _request: Request;
    static _response: Response;
    /**
     * Initiate a middleware for the decorators
     * @param request
     * @param response
     * @param next
     */
    initRouter(request: Request, response: Response, next: NextFunction): void;
    static request(): RequestHandler;
    static response(): ResponseHandler;
}
