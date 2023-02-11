import express from 'express';
import helmet from 'helmet';
import { Connection, createConnection } from 'mysql';

let connection: undefined | Connection;

export function host(port: number, options: DatabaseOptions, callback?: () => {}) {
  /**
   * Create a new MySQL connection.
   */
  connection = createConnection(options);

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
  return app.listen(port) && callback;
}

export function getConnection(): Connection {
  if (!connection) throw Error('Please establish a connection with MySQL first.');

  return connection;
}

export interface DatabaseOptions {
  host: string;
  user: string;
  password: string;
  database: string;
}
