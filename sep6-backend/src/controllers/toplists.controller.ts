import {getMovies} from "../dao/movies";
import {
    addMovieIntoToplist,
    addToplist,
    deleteMovieFromToplist,
    getMoviesfromToplists,
    getToplistByUser,
    removeToplist
} from "../dao/toplists";

export async function  getAllToplistsByUser(req,res, next){
    try {
        const toplists = await getToplistByUser( req, res, next);
        res.status(200).json(toplists);
    } catch (error) {
        next(error);
    }
}

export async function  createToplist(req,res, next){
    try {
        const toplist = await addToplist(req, res, next);
        res.status(200).json(toplist);
    } catch (error) {
        next(error);
    }
}

export async function  deleteToplist(req,res, next){
    try {
         await removeToplist(req,res,next)
        res.status(200).json('success');
    } catch (error) {
        next(error);
    }
}

export async function  addMovieToToplist(req,res, next){
    try {
        const toplistWithMovies = await addMovieIntoToplist(req, res, next);
        res.status(200).json(toplistWithMovies)
    } catch (error) {
        next(error);
    }
}



export async function  getMoviesInToplist(req,res, next){
    try {
        await getMoviesfromToplists(req, res, next);
    } catch (error) {
        next(error);
    }
}

export async function  removeMovieFromToplist(req,res, next){
    try {

        await deleteMovieFromToplist(req, res, next)

        res.status(200).json('success');
    } catch (error) {
        next(error);
    }
}