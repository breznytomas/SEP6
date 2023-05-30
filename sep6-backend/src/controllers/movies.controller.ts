import {getMovieDetails, getMovieDirectorOrActor, getMovies} from '../dao/movies';


export async function  getAllMovies(req,res, next){
    const movies = await getMovies();
    res.status(200).json(movies);
}


export async function  getSearchResults(req,res, next) {
  const param = req.params.searchTerm
    const returnObject = await getMovieDirectorOrActor(param)
    res.status(200).json(returnObject);
}


  export async function getDetailsMovie(req, res, next) {
    const movieId = req.params.movieId
      const returnObject = await getMovieDetails(movieId)
      res.status(200).json(returnObject);
  }















