import * as express from 'express';

export const defaultRouter = express.Router();

/**
 * Default option that receives petitions of functions that
 * havent been implemented yet
 */
defaultRouter.all('*', (_, res) => {
  res.status(501).send();
});