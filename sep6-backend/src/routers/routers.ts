import express from 'express';
import moviesRouter from './movies.router';
import welcomeRouter from './welcome.router';
import loginRouter from './login.router';
import toplistRouter from "./toplist.router";
import peopleRouter from "./people.router";



//here you add routers, routers -> specific router -> controller -> dao

const createMainRouter = (): express.Router => {
    const router = express.Router();


router.use('/movies', moviesRouter);
router.use('/welcome', welcomeRouter);
router.use('/login', loginRouter);
router.use('/toplists', toplistRouter);
router.use('/people', peopleRouter);



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
