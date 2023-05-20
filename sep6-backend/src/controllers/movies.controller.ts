import { getMovies } from '../dao/movies';

export async function  getAllMovies(req,res, next){
  try {
    const movies = await getMovies();
    res.status(200).json(movies);
  } catch (error) {
    next(error);
  }
}

export const getMovieByName = async (req, res, next) => {
  try {
    //const movies = await getMovie()
    res.status(200).json("getting movie with name: " + req.params.movieID)
    // res.status(200).json(movies);
  } catch (error) {
    next(error);
  }
};


export const getMoviesByDirector = async (req, res, next) => {
  try {
    //const movies = await getMovie()
    res.status(200).json("getting movie with name: " + req.params.movieID)
    // res.status(200).json(movies);
  } catch (error) {
    next(error);
  }
};

export const getMoviesByActor = async (req, res, next) => {
  try {
    //const movies = await getMovie()
    res.status(200).json("getting movie with name: " + req.params.movieID)
    // res.status(200).json(movies);
  } catch (error) {
    next(error);
  }
};

