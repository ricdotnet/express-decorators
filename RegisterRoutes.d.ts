import { Express, Router } from 'express';
import 'reflect-metadata';
export declare class RegisterRoutes {
    app: Express;
    apiRoutes: Router;
    dir: string;
    constructor(app: Express, dir: string);
    private register;
    /**
     * This can be refactored to fetch all controllers and register them in the main route.
     * That can be achieved by reading all the files in the Api (to be renamed Controllers) folder.
     * @private
     */
    private static getControllers;
    /**
     * TODO: Maybe this needs some refactoring 🤔
     * Look horrible but it works alright
     */
    registerControllers(): Promise<RegisterRoutes>;
    registerRoutes(): void;
}
