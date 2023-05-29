import express from 'express';
import {getAllMovies, getDetailsMovie, getSearchResults} from '../controllers/movies.controller';
import {getMovieDirectorOrActor} from "../dao/movies";
import {handleErrorAsync} from "../middleware/errorHandling";



const createMoviesRouter = (): express.Router => {
    const router = express.Router()



  router.get('/' , handleErrorAsync(getAllMovies));

  router.get('/movie/:movieId',handleErrorAsync(getDetailsMovie));

  router.get('/:searchTerm', handleErrorAsync(getSearchResults));







return router
}
export default createMoviesRouter()