import { Director } from './director';
import { Rating } from './rating';
import { Star } from './star';

export interface Movie {
  id: number;
  title: string;
  year: string;
  director: Director;
  stars: Star[];
  poster?: string;
  rating?: Rating;
}
