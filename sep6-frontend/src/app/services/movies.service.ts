import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { movie } from '../models/movie';
import { UrlUtil } from './urlUtil';

@Injectable()
export class moviesService {
  public constructor(
    private httpClient: HttpClient,
    private urlUtil: UrlUtil
  ) {}

  public getMovies(): Observable<movie[]> {
    return this.httpClient.get<movie[]>(this.urlUtil.baseUrl + '/movies');
  }
}
