import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

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

  constructor(private userService: UserService, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<User | null>(null);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  public login(email: string, password: string) {
    this.userService
      .login(email, password)
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe(
        (response) => {
          console.log('Login response', response);
          this.currentUserSubject.next(response.user);
          this.router.navigateByUrl('/');
        },
        (error) => {
          console.log('Login error', error);
        }
      );
  }

  public register(user: User) {
    this.userService
      .register(user)
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe((response) => {
        console.log(response);
        this.router.navigateByUrl('/account/logon');
      });
  }

  public logout() {
    this.currentUserSubject.next(null);
  }

  ngOnDestroy() {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }
}
