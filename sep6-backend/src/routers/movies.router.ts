import express from 'express';
import {getAllMovies, getDetailsMovie,  getSearchResults} from '../controllers/movies.controller';



const createMoviesRouter = (): express.Router => {
    const router = express.Router()



  router.get('/' , getAllMovies);

  router.get('/:name',getSearchResults);

  router.get('/movie/:movieId',getDetailsMovie);







return router
}
export default createMoviesRouter()