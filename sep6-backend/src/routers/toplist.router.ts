import express from "express";
import {ensureAuthenticated} from "../controllers/login.controller";
import {
    addMovieToToplist,
    createToplist,
    deleteToplist,
    getAllToplistsByUser, getMoviesInToplist,
    removeMovieFromToplist
} from "../controllers/toplists.controller";



const createToplistRouter = (): express.Router => {
    const router = express.Router()

    router.get('/' ,ensureAuthenticated,getAllToplistsByUser );

    router.post('/',ensureAuthenticated, createToplist);

    router.delete('/:id', ensureAuthenticated, deleteToplist );

    router.post('/create',ensureAuthenticated,addMovieToToplist);

    router.get('/toplistMovies', ensureAuthenticated, getMoviesInToplist)

    router.post('/disconnect',ensureAuthenticated, removeMovieFromToplist)


    return router
}
export default createToplistRouter()