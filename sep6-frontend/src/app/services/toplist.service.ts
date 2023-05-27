import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Toplist } from '../models/toplist';
import { UrlUtil } from './urlUtil';

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
}
