import { Movie } from './movie';

export interface Person {
  name: string;
  starredIn?: Movie[];
  directed?: Movie[];
  directorAvgRating?: number;
  actorAvgRating?: number;
}
