import express from 'express';

import { getAllMovies } from '../controllers/movies.controller';

export default (router: express.Router) => {
  console.log('router');
  router.get('/movies', getAllMovies);
};
