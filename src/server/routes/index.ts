import { Router } from 'express';
import { apiRouter } from './api';

const allRoutes = Router();

allRoutes.use('/api', apiRouter);

export { allRoutes };
