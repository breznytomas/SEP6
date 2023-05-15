import express, { Request, Response } from 'express';
import moviesRouter from './movies.router';
import welcomeRouter from './welcome.router';
import loginRouter from './login.router';



//here you add routers, routers -> specific router -> controller -> dao

const createMainRouter = (): express.Router => {
    const router = express.Router();

    console.log("id 1")

router.use('/movies', moviesRouter);
router.use('/welcome', welcomeRouter);
router.use('/login', loginRouter);



return router
}

export default createMainRouter

/*
WHAT DIS??
export default (): express.Router => {
  moviesRouter(router);
  welcomeRouter(router);
  return router;
};
*/
