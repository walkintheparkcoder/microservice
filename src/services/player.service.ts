import { Router } from 'express';
import { connection } from '../app';

const service = Router();

service.get('/load', (req, res) => {
  /**
   * The UUID of the player gets passed through
   * the query because this is a GET request.
   */
  const { uuid } = req.query;

  connection.query(`SELECT * FROM players WHERE uuid='${uuid}'`, (error, results) => {
    if (error) throw error;

    /**
     * Return the player's data from MySQL.
     */
    res.send(results[0]);
  });
});

service.get('/friend_add', (req, res) => {
  /**
   * The UUID of the player gets passed through
   * the query because this is a GET request.
   */
  // const { uuid } = req.query;

  /**
   * This data should obviously be requested from
   * a third party database like MongoDB or MySQL.
   */
  res.send({
    level: 78,
    coins: 89131,
    rank: 'ADMIN',
  });
});

export { service as playerService };
