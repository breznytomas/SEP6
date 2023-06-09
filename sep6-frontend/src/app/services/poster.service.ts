import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, concatMap, first, from, map, of } from 'rxjs';

@Injectable()
export class PosterService {
  private readonly apiKey = '90a61677044ae8dd4580799b3e6db41a';

  public constructor(private httpClient: HttpClient) {}

  public getPoster(id: number, isFeatured: boolean): Observable<string | null> {
    const size = isFeatured ? 'w500' : 'w92';
    const idPrefixes = ['tt', 'tt0', 'tt00'];

    return from(idPrefixes).pipe(
      concatMap((prefix) => {
        const url = `https://api.themoviedb.org/3/find/${prefix}${id}?api_key=${this.apiKey}&external_source=imdb_id`;
        return this.httpClient.get(url).pipe(
          map((response: any) => {
            if (response.movie_results && response.movie_results.length > 0) {
              const imagePath = response.movie_results[0].poster_path;
              if (imagePath) {
                return `https://image.tmdb.org/t/p/${size}${imagePath}`;
              }
            }
            return null;
          }),
          catchError(() => of(null))
        );
      }),
      first((imageUrl) => imageUrl !== null, null)
    );
  }
}
