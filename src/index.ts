import express from 'express';
import helmet from 'helmet';
import { Connection, createConnection } from 'mysql';

interface DatabaseOptions {
  host: string;
  user: string;
  password: string;
  database: string;
}

export class Microservice {
  private connection: Connection;
  private app: express.Application;

  constructor(port: number, options: DatabaseOptions) {
    this.connection = createConnection(options);

    this.app = express();
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(helmet({ contentSecurityPolicy: false }));

    this.app.listen(port, () => console.log(`Microservice running on port ${port}`));
  }

  public getConnection(): Connection {
    if (!this.app) throw Error('Please host a microservice first.');
    if (!this.connection)
      throw Error('Could not establish a connection with MySQL, please check your credentials.');

    return this.connection;
  }

  public addEndpoint(name: string, router: express.Router) {
    this.app.use(name, router);
  }
}
