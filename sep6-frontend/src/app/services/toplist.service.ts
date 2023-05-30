import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Toplist } from '../models/toplist';
import { UrlUtil } from './urlUtil';
import { FormsModule } from '@angular/forms';
@Injectable({
  providedIn: 'root',
})
export class ToplistService {
  public constructor(
    private httpClient: HttpClient,
    private urlUtil: UrlUtil
  ) {}

  public getTopLists(): Observable<Toplist[]> {
    return this.httpClient.get<Toplist[]>(this.urlUtil.baseUrl + '/toplists', {
      withCredentials: true,
    });
  }

  public createToplist(toplist: {
    name: string;
    description: string;
  }): Observable<Toplist> {
    return this.httpClient.post<Toplist>(
      this.urlUtil.baseUrl + '/toplists',
      toplist,
      {
        withCredentials: true,
      }
    );
  }

  public deleteToplist(id: number): Observable<void> {
    return this.httpClient.delete<void>(
      `${this.urlUtil.baseUrl}/toplists/${id}`,
      {
        withCredentials: true,
      }
    );
  }

  public addMovieToToplist(
    toplistId: number,
    movieId: number
  ): Observable<void> {
    return this.httpClient.post<void>(
      this.urlUtil.baseUrl + '/toplists/create',
      { toplistId, movieId },
      {
        withCredentials: true,
      }
    );
  }

  public deleteMovieFromToplist(
    toplistId: number,
    movieId: number
  ): Observable<void> {
    return this.httpClient.post<void>(
      this.urlUtil.baseUrl + '/toplists/disconnect',
      { toplistId, movieId },
      {
        withCredentials: true,
      }
    );
  }
}
