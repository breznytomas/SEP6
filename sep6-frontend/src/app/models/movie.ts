import { director } from './director';
import { star } from './star';

export interface movie {
  id: number;
  title: string;
  year: string;
  directors: director[];
  stars: star[];
}
