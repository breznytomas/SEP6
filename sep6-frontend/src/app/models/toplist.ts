import { Movie } from './movie';

export interface Toplist {
  id: number;
  name: string;
  description: string;
  user_id: number;
  movies: Movie[];
}
