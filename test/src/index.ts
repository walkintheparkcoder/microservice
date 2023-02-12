import Microservice from '@spigotmc/microservice';
import { createConnection } from 'mysql';
import route from './routes';

/**
 * MySQL credentials
 */
const mysql = {
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'password',
  database: 'minecraft',
};

/**
 * Create a new MySQL connection.
 */
export const connection = createConnection(mysql);
connection.connect();

/**
 * Create a new Microservice instance.
 */
const service = Microservice.host(8080);
service.setDefiningRoute('/api', route.register());
