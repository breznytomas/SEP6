import {getMovieDetails, getMovieDirectorOrActor, getMovies} from '../dao/movies';


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


export async function  getSearchResults(req,res, next) {
  const searchTerm = req.params.name
  try {
    const returnObject = await getMovieDirectorOrActor(searchTerm)
    res.status(200).json(returnObject);
  } catch (error) {
    next(error);
  }
}


  export async function getDetailsMovie(req, res, next) {
    const movieId = req.params.movieId
    try {
      const returnObject = await getMovieDetails(movieId)
      res.status(200).json(returnObject);
    } catch (error) {
      next(error);
    }
  }















