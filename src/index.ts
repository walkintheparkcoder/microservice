import express from 'express';

/**
 * @class Microservice
 * The Microservice class.
 */
export default class Microservice {
  /**
   * Final variables in the class.
   */
  private app: express.Application;

  /**
   * @constructor Microservice
   * @param connection The MySQL connection.
   * @param app The Express application.
   */
  constructor(app: express.Application) {
    this.app = app;
  }

  /**
   * @param port The specified port of the service.
   * @param options The credentials for the database.
   * @returns A new instance of the Microservice class.
   */
  static host(port: number) {
    /**
     * Create app and point routes.
     */
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    /**
     * Listen server on specified port.
     */
    app.listen(port, () => console.log(`Microservice running on port ${port}`));

    /**
     * Return a new Microservice object.
     */
    return new Microservice(app);
  }

  /**
   * @returns The Express application on which the
   * microservice is hosted for perhaps adding
   * or modifying certain middleware.
   */
  public getApplication(): express.Application {
    return this.app;
  }

  /**
   * @param name The name of the route for e.g. `/api`
   * @param router The router holding the endpoints.
   */
  public setDefiningRoute(name: string, router: express.Router) {
    this.app.use(name, router);
  }
}

export class Router {
  private router: express.Router;

  constructor() {
    this.router = express.Router();
  }

  public register() {
    return this.router;
  }

  public use(name: string, router: Router) {
    this.router.use(name, router.register());
  }

  public get(name: string, fn: (query?: any) => any) {
    this.router.get(name, async (req, res) => res.send(await fn(req.query)));
  }

  public post(name: string, fn: (body?: any) => any) {
    this.router.post(name, async (req, res) => res.send(await fn(req.body)));
  }

  public put(name: string, fn: (body?: any) => any) {
    this.router.put(name, async (req, res) => res.send(await fn(req.body)));
  }

  public delete(name: string, fn: (query?: any) => any) {
    this.router.delete(name, async (req, res) => res.send(await fn(req.query)));
  }
}
