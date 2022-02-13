import { IncomingHttpHeaders } from 'http2';
import { IRequest } from "../../Interfaces/IRequest";
interface IncomingHeaders extends IncomingHttpHeaders {
    authorization: string;
}
/**
 * Request constructor
 */
export declare class RequestHandler {
    _request: IRequest;
    constructor(request: IRequest);
    headers(): IncomingHeaders;
    /**
     * Setter to set any custom data that we want to pass from the middlewares.
     * @param arg
     */
    data<T>(arg?: string | {
        [key: string]: T;
    }): T | void;
    /**
     * We use any as the return type because we can pass anything as a parameter and we want to be able
     *  to destructure an object in the route method.
     */
    parameters(p: string): any;
    /**
     * We need sometimes to get the queries from the url so we use this method.
     * api.unispaces.uk/endpoint?key=value&key=value&key=value
     */
    query(q: string): any;
    /**
     * Return the request body
     * TODO: maybe make it not return anything if there is no body 🤔
     */
    body<T>(key?: string): T;
    method(): string;
    /**
     * We use this to get the token from the headers once it gets validated by the auth middleware
     *
     * THIS WILL ONLY BE CALLED WHEN THERE IS A TOKEN!!!
     */
    token(): string;
}
export {};
