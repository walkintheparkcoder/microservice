import { Router } from '@spigotmc/microservice';
import { connection } from '..';

/**
 * Create a new router for this service.
 */
const service = new Router();

/**
 * This is only one example of four methods
 */
service.get('/load', (query) => {
  /**
   * The UUID of the player gets passed through
   * the query because this is a GET request.
   */
  const uuid: string = query.uuid;

  /**
   * This is the query that gets executed.
   */
  const sql = `SELECT * FROM players WHERE uuid='${uuid}'`;

  /**
   * Execute the query and wait for the result.
   */
  return new Promise((resolve, reject) => {
    connection.query(sql, (error, results) => {
      /**
       * Reject the promise if an error occured.
       */
      if (error) return reject(error);
      /**
       * Resolve the promise with player's data.
       */
      resolve(results[0]);
    });
  });
});

/**
 * Other endpoints like `/coin_update`, etc.,
 * should be implemented in this same file.
 */
export { service as playerService };
