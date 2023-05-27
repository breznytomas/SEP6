import { Movie } from './movie';
import { Person } from './person';
import { Star } from './star';

export interface SearchResult {
  movies: Movie[];
  people: Star[];
}
