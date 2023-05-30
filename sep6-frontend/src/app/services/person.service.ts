import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlUtil } from './urlUtil';
import { Observable, map } from 'rxjs';
import { Person } from '../models/person';
import { Movie } from '../models/movie';

@Injectable()
export class PersonService {
  public constructor(
    private httpClient: HttpClient,
    private urlUtil: UrlUtil
  ) {}

  public getRelatedMovies(id: number): Observable<Person> {
    return this.httpClient.get(this.urlUtil.baseUrl + '/people/' + id).pipe(
      map((response: any): Person => {
        let directedMovies: Movie[] =
          response.personWithDetails.directors?.map((director: any) => {
            return {
              id: director.movies.id,
              title: director.movies.title,
              year: director.movies.year,
            } as Movie;
          }) || [];

        let starredMovies: Movie[] =
          response.personWithDetails.stars?.map((star: any) => {
            return {
              id: star.movies.id,
              title: star.movies.title,
              year: star.movies.year,
            } as Movie;
          }) || [];

        let directorAvgRating = response.directorAvgRating
          ? Math.round(response.directorAvgRating * 100) / 100
          : null;
        let actorAvgRating = response.actorAvgRating
          ? Math.round(response.actorAvgRating * 100) / 100
          : null;

        return {
          name: response.personWithDetails.name,
          directed: directedMovies,
          starredIn: starredMovies,
          directorAvgRating: directorAvgRating,
          actorAvgRating: actorAvgRating,
        } as Person;
      })
    );
  }
}
