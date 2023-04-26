import express, { Request, Response } from 'express';

import { getMovies } from '../db/movies';

export const getAllMovies = async (
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
};
