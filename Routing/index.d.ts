import { RequestHandler } from './Requests/RequestHandler';
import { RequestContext } from './Requests/RequestContext';
import { ResponseHandler } from './Requests/ResponseHandler';
import { IResponse } from "../Interfaces/IResponse";
export { RequestContext };
export { RequestHandler };
export { ResponseHandler };
declare function request(): RequestHandler;
export { request };
declare function response(): ResponseHandler;
export { response };
export declare function respond(body: string | object, code: number): IResponse;
/**
 * We use this method to retrieve a parameter from the url
 * @param p
 */
declare function param<T>(p?: string): T;
export { param };
declare function query<T>(q?: string): T;
export { query };
