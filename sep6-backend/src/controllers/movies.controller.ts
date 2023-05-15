import express, { Request, Response } from 'express';

import { getMovies } from '../dao/movies';

/*export const getAllMovies = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    console.log('getting movies');
    const movies = await getMovies();
    return res.status(200).json(movies);
  } catch (error) {
    console.error(error);
    return res.sendStatus(400);
  }
};*/


export const getAllMovies = async (req, res, next) => {
  try {
    const movies = await getMovies();
    res.status(200).json(movies);
  } catch (error) {
    next(error);
  }
};


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
