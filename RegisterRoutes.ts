import { Express, Router } from 'express';
import { files } from 'node-dir';
import 'reflect-metadata';
import * as path from 'path';
import * as fs from 'fs';
import {IController} from "./Interfaces/IController";
import {IRouteMetaData} from "./Interfaces/IRouteMetaData";
import {RequestContext} from "./Routing";

export class RegisterRoutes {
  app: Express;
  apiRoutes: Router = Router();

  // this is temp until I figure how to read an key:value from tsconfig. sad 😭
  dir: string;

  constructor(app: Express, dir: string) {
    this.app = app;
    this.dir = dir;
    this.register();
  }

  private async register() {
    await this.registerControllers();
    this.registerRoutes();
  }

  /**
   * This can be refactored to fetch all controllers and register them in the main route.
   * That can be achieved by reading all the files in the Api (to be renamed Controllers) folder.
   * @private
   */
  private static async getControllers(dir: string): Promise<any[]> {
    // const  = path.join(process.cwd(), 'tsconfig.json');
    // let data:any = fs.readFileSync(config);

    const controllerFiles = files(path.join(process.cwd(), dir), { sync: true });
    const controllers: any[] = [];

    for (const c of controllerFiles) {
      if (c) {
        controllers.push(await import(c));
      }
    }

    return controllers;
  }

  /**
   * TODO: Maybe this needs some refactoring 🤔
   * Look horrible but it works alright
   */
  public async registerControllers(): Promise<RegisterRoutes> {
    const controllers: any[] = await RegisterRoutes.getControllers(this.dir);
    for (const controller of controllers) {
      // (await Api.getControllers()).forEach((controller) => {
      const group: { [n: string]: any } = Router();
      // const Controller = new controller();
      const c = Object.values(controller)[0];
      const controllerData: IController = Reflect.getMetadata('controller', <object>c);
      // this.apiRoutes.use(path, Controller.route);

      // This
      const methodRoutes = Reflect.getMetadata('method', <object>c);
      // the next if statement is to make sure the booter does not crash if a controller has no methods
      // UNI-29
      if (methodRoutes) {
        methodRoutes.forEach((route: IRouteMetaData) => {
          if (route.middlewares) {
            group[route.method].apply(group, [route.path, route.middlewares, route.target]);
          } else {
            group[route.method].apply(group, [route.path, route.target]);
          }
        });
      }

      // This will register a global middleware defined on the @Controller decorator
      if (controllerData.middlewares) {
        this.apiRoutes.use(controllerData.path, controllerData.middlewares, <Router>group);
      } else {
        this.apiRoutes.use(controllerData.path, <Router>group);
      }

      // Api.apiRoutes.use(controllerData.path, <Router>group);
      // });
    }

    return this;
  }

  public registerRoutes() {
    this.app.use('/', new RequestContext().initRouter)
    this.app.use('/', this.apiRoutes);
  }
}
