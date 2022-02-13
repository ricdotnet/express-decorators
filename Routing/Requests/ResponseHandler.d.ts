import { Response } from 'express';
/**
 * Response constructor
 */
export declare class ResponseHandler {
    _response: Response;
    _code: number;
    constructor(response: Response);
    status(code: number): this;
    send(body: object, code?: number): this;
    end(): any;
}
