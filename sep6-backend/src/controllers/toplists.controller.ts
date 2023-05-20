import {getMovies} from "../dao/movies";
import {addToplist, getToplistByUser} from "../dao/toplists";

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
        const movies = await getMovies();
        res.status(200).json(movies);
    } catch (error) {
        next(error);
    }
}

export async function  AddToToplist(req,res, next){
    try {
        const movies = await getMovies();
        res.status(200).json(movies);
    } catch (error) {
        next(error);
    }
}

export async function  removeMovieFromToplist(req,res, next){
    try {
        const movies = await getMovies();
        res.status(200).json(movies);
    } catch (error) {
        next(error);
    }
}