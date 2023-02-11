import express from 'express';
import { createConnection } from 'mysql';

/**
 * Create a new MySQL connection.
 */
export const connection = createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'minecraft',
});

connection.connect();

/**
 * Create app and point routes.
 */
const app = express();

/**
 * Listen server on for eg. :8080
 */
app.listen(8080, () => console.log('Server started.'));
