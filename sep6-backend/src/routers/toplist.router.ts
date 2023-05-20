import express from "express";
import {ensureAuthenticated} from "../controllers/login.controller";
import {
    AddToToplist,
    createToplist,
    deleteToplist,
    getAllToplistsByUser,
    removeMovieFromToplist
} from "../controllers/toplists.controller";


const createToplistRouter = (): express.Router => {
    const router = express.Router()

    router.get('/' ,ensureAuthenticated,getAllToplistsByUser );

    router.post('/',ensureAuthenticated, createToplist);

    router.delete('/', ensureAuthenticated, deleteToplist );

    router.post('/create',ensureAuthenticated,AddToToplist);

    router.delete('movieToplist',ensureAuthenticated, removeMovieFromToplist)


    return router
}
export default createToplistRouter()