import { Component, OnDestroy, OnInit } from '@angular/core';
import { Movie } from './models/movie';
import { MoviesService } from './services/movies.service';
import { Observable, Subject, map, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import { User } from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  public movies: Movie[];
  public featuredMovie: Movie;
  public showSearch = false;
  public currentUser: User;
  private _unsubscribe$ = new Subject();
  selectedMovie: Movie;

  public constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.authService
      .isAuthenticated()
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe((user) => {
        this.currentUser = user;
      });

    this.authService.currentUser
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe((u) => (this.currentUser = u));
  }

  public onSubmit(searchTerm: string) {
    if (searchTerm) {
      this.router.navigate(['/search', { term: searchTerm }]);
      this.showSearch = false;
    }
  }

  ngOnDestroy(): void {
    this._unsubscribe$.next(true);
    this._unsubscribe$.complete();
  }
}
