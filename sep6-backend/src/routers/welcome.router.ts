import express, { Request, Response } from 'express';

export default (router: express.Router) => {
  console.log('router');
  router.get('/', async (req: express.Request, res: express.Response) => {
    try {
      return res.status(200).json('hello');
    } catch (error) {
      console.error(error);
      return res.sendStatus(400);
    }
  });
};
