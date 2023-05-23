import express from 'express';
import {getAllMovies, getDetailsMovie} from '../controllers/movies.controller';



const createMoviesRouter = (): express.Router => {
    const router = express.Router()



  router.get('/' , getAllMovies);

  router.get('/movie/:movieId',getDetailsMovie);







return router
}
export default createMoviesRouter()