import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlUtil } from './urlUtil';
import { User } from '../models/user';
import { Observable } from 'rxjs';

@Injectable()
export class UserService {
  public constructor(
    private httpClient: HttpClient,
    private urlUtil: UrlUtil
  ) {}

  public login(email: string, password: string): Observable<any> {
    const loginUrl = `${this.urlUtil.baseUrl}/login/login`;
    return this.httpClient.post(
      loginUrl,
      { email: email, password: password },
      { withCredentials: true }
    );
  }
}
