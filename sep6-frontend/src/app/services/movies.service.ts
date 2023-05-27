import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { Movie } from '../models/movie';
import { UrlUtil } from './urlUtil';
import { Star } from '../models/star';
import { SearchResult } from '../models/search-result';

@Injectable()
export class MoviesService {
  public constructor(
    private httpClient: HttpClient,
    private urlUtil: UrlUtil
  ) {}

  public getMovies(): Observable<Movie[]> {
    return this.httpClient.get(this.urlUtil.baseUrl + '/movies').pipe(
      map((response: any[]) => {
        const movies: Movie[] = [];

        response.forEach((movieData: any) => {
          const movie: Movie = {
            id: movieData.id,
            title: movieData.title,
            year: movieData.year,
            director: {
              id: movieData.directors[0]?.people.id,
              name: movieData.directors[0]?.people.name,
              birth: movieData.directors[0]?.people.birth,
            },
            stars: movieData.stars.map((star: any) => ({
              id: star.people.id,
              name: star.people.name,
            })),
            rating: {
              rating: movieData.ratings[0]?.rating,
              votes: movieData.ratings[0]?.votes,
            },
          };

          movies.push(movie);
        });

        return movies;
      })
    );
  }

  public getMovieDetails(movieId: number): Observable<Movie> {
    return this.httpClient
      .get<Movie>(this.urlUtil.baseUrl + '/movies/movie/' + movieId)
      .pipe(
        map((movieData: any) => {
          const movie: Movie = {
            id: movieData.id,
            title: movieData.title,
            year: movieData.year,
            director: {
              id: movieData.directors[0]?.people.id,
              name: movieData.directors[0]?.people.name,
              birth: movieData.directors[0]?.people.birth,
            },
            stars: movieData.stars.map((star: any) => {
              return {
                id: star.people.id,
                name: star.people.name,
              } as Star;
            }),
            rating: {
              rating: movieData.ratings[0]?.rating,
              votes: movieData.ratings[0]?.votes,
            },
          };

          return movie;
        })
      );
  }

  public search(searchTerm: string): Observable<SearchResult> {
    return this.httpClient
      .get<SearchResult>(this.urlUtil.baseUrl + '/movies/search/' + searchTerm)
      .pipe(
        map((response) => ({
          movies: response.movies,
          people: response.people,
        }))
      );
  }
}
