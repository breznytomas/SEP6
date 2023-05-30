import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlUtil } from './urlUtil';
import { User } from '../models/user';
import { Observable, map } from 'rxjs';

@Injectable()
export class UserService {
  public constructor(
    private httpClient: HttpClient,
    private urlUtil: UrlUtil
  ) {}

  public login(email: string, password: string): Observable<User> {
    const loginUrl = `${this.urlUtil.baseUrl}/login/login`;
    return this.httpClient
      .post(
        loginUrl,
        { email: email, password: password },
        { withCredentials: true }
      )
      .pipe(
        map((response: any) => {
          const user = response.user;
          return user as User;
        })
      );
  }

  public logout(): Observable<any> {
    const url = `${this.urlUtil.baseUrl}/login/logout`;
    return this.httpClient.get(url, { withCredentials: true });
  }

  public isAuthenticated(): Observable<User> {
    const url = `${this.urlUtil.baseUrl}/login/checkAuth`;
    return this.httpClient.get<User>(url, { withCredentials: true });
  }

  public register(user: User) {
    const registerUrl = `${this.urlUtil.baseUrl}/login/signup`;
    return this.httpClient.post(registerUrl, user);
  }
}
