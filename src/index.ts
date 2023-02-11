import { Connection, createConnection } from 'mysql';
import express from 'express';
import helmet from 'helmet';

/**
 * @class Microservice
 * The Microservice class.
 */
export class Microservice {
  /**
   * Final variables in the class.
   */
  private connection: Connection;
  private app: express.Application;

  /**
   * @constructor Microservice
   * @param connection The MySQL connection.
   * @param app The Express application.
   */
  constructor(connection: Connection, app: express.Application) {
    this.connection = connection;
    this.app = app;
  }

  /**
   * @param port The specified port of the service.
   * @param options The credentials for the database.
   * @returns A new instance of the Microservice class.
   */
  static host(port: number, options: DatabaseOptions) {
    try {
      /**
       * Create a new MySQL connection.
       */
      const connection = createConnection(options);
      connection.connect();

      /**
       * Create app and point routes.
       */
      const app = express();
      app.use(express.json());
      app.use(express.urlencoded({ extended: true }));
      app.use(helmet({ contentSecurityPolicy: false }));

      /**
       * Listen server on specified port.
       */
      app.listen(port, () => console.log(`Microservice running on port ${port}`));

      /**
       * Return a new Microservice object.
       */
      return new Microservice(connection, app);
    } catch (exception) {
      console.error(exception);
    }
  }

  /**
   * @returns The current MySQL connection.
   */
  public getConnection(): Connection {
    return this.connection;
  }

  /**
   * @param name The name of the route for e.g. `/api`
   * @param router The router holding the endpoints.
   */
  public addEndpoint(name: string, router: express.Router) {
    this.app.use(name, router);
  }
}

/**
 * @interface DatabaseOptions
 * Interface which holds the login credentials.
 */
interface DatabaseOptions {
  host: string;
  user: string;
  password: string;
  database: string;
}
