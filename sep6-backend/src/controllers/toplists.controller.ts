
import {
    addMovieIntoToplist,
    addToplist,
    deleteMovieFromToplist,
    getToplistByUser,
    removeToplist
} from "../dao/toplists";

export async function  getAllToplistsByUser(req,res, next){
        const toplists = await getToplistByUser(req.user.id);
        res.status(200).json(toplists);
}

export async function  createToplist(req,res, next){
    const { name, description } = req.body;
     const toplist = await addToplist(req.user.id,name, description );
        res.status(200).json(toplist);
}

export async function  deleteToplist(req,res, next){
         await removeToplist(req.user.id, parseInt(req.params.id))
        res.status(200).json("success");
}

export async function  addMovieToToplist(req,res, next){
    const {toplistId, movieId} = req.body;
        const toplistWithMovies = await addMovieIntoToplist(toplistId,movieId,req.user.id);
        res.status(200).json(toplistWithMovies)
}





export async function  removeMovieFromToplist(req,res, next){
    const {toplistId, movieId} = req.body;
        await deleteMovieFromToplist(toplistId,req.user.id, movieId)
        res.status(200).json('success');
}