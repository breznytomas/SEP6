import express, { Request, Response } from 'express';
import moviesRouter from './movies.router';
import welcomeRouter from './welcome.router';

const router = express.Router();

//here you add routers, routers -> specific router -> controller -> db
export default (): express.Router => {
  moviesRouter(router);
  welcomeRouter(router);
  return router;
};
