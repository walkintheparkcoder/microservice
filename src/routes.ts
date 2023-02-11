import { Router } from 'express';
import { playerService } from './services/player.service';

const apiRouter = Router();

/**
 * Add the newly created service and any other
 * service, in this routes file.
 */
apiRouter.use('/player', playerService);

export default apiRouter;
