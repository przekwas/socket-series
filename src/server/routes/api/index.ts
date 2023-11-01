import { Router } from 'express';
import { messagesRouter } from './messages';
import { matchesRouter } from './matches';

const apiRouter = Router();

apiRouter.use('/messages', messagesRouter);
apiRouter.use('/matches', matchesRouter);

export { apiRouter };
