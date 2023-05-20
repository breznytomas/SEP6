import { Component, OnDestroy, OnInit } from '@angular/core';
import { movie } from './models/movie';
import { moviesService } from './services/movies.service';
import { Subject, map, takeUntil } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  public movies: movie[];
  public mainMovie: movie;
  private _unsubscribe$ = new Subject();
  public constructor(private _moviesService: moviesService) {}

  ngOnInit(): void {
    this._moviesService
      .getMovies()
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe((movies) => {
        this.movies = movies;
        this.mainMovie = movies[0];
        console.log(movies);
      });
  }

  ngOnDestroy(): void {
    this._unsubscribe$.next(true);
    this._unsubscribe$.complete();
  }
}
