import { Router } from '@spigotmc/microservice';
import { playerService } from './services/player.service';

/**
 * Create a new Router from the Microservice library.
 */
const router = new Router();

/**
 * Add any sub-routes to the main router.
 */
router.use('/player', playerService);

/**
 * Export the router so that we can use
 * it in the main class where you decl-
 * ared the microservice.
 */
export default router;
