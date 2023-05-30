import express from "express";
import {ensureAuthenticated} from "../controllers/login.controller";
import {
    addMovieToToplist,
    createToplist,
    deleteToplist,
    getAllToplistsByUser,
    removeMovieFromToplist
} from "../controllers/toplists.controller";
import {handleErrorAsync} from "../middleware/errorHandling";



const createToplistRouter = (): express.Router => {
    const router = express.Router()

    router.get('/' ,ensureAuthenticated,handleErrorAsync(getAllToplistsByUser));

    router.post('/',ensureAuthenticated, handleErrorAsync(createToplist));

    router.delete('/:id', ensureAuthenticated, handleErrorAsync(deleteToplist) );

    router.post('/create',ensureAuthenticated,handleErrorAsync(addMovieToToplist));

    router.post('/disconnect',ensureAuthenticated, handleErrorAsync(removeMovieFromToplist))


    return router
}
export default createToplistRouter()