import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

import { UserService } from './user.service';
import { User } from '../models/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService implements OnDestroy {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;
  private _unsubscribe$ = new Subject<void>();
  public isUser = false;
  constructor(private userService: UserService, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<User | null>(null);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  public login(email: string, password: string): Observable<any> {
    return this.userService
      .login(email, password)
      .pipe(takeUntil(this._unsubscribe$))
      .pipe(
        tap((response) => {
          this.currentUserSubject.next(response);
          this.isUser = true;
          this.router.navigateByUrl('/');
        })
      );
  }

  public register(user: User) {
    this.userService
      .register(user)
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe((response) => {
        this.router.navigateByUrl('/account/logon');
      });
  }

  public isAuthenticated(): Observable<any> {
    return this.userService.isAuthenticated().pipe(
      takeUntil(this._unsubscribe$),
      tap((user) => {
        this.currentUserSubject.next(user);
        this.isUser = true;
      })
    );
  }

  public logout() {
    this.userService
      .logout()
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe((res) => {
        console.log(res);
        this.isUser = false;
        this.currentUserSubject.next(null);
        this.router.navigateByUrl('/');
      });
  }

  ngOnDestroy() {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }
}
