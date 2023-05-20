import express from 'express';
import {getAllMovies, getMovieByName} from '../controllers/movies.controller';
import {ensureAuthenticated} from "../controllers/login.controller";



const createMoviesRouter = (): express.Router => {
    const router = express.Router()



  router.get('/' , getAllMovies);

  router.get('/:movieID',getMovieByName);





return router
}
export default createMoviesRouter()