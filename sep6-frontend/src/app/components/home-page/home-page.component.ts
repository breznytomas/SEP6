import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Movie } from 'src/app/models/movie';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit, OnDestroy {
  public movies: Movie[];
  public featuredMovie: Movie;
  public isLoading = false;
  private _unsubscribe$ = new Subject();
  selectedMovie: Movie;

  public constructor(
    private _moviesService: MoviesService,
    private router: Router
  ) {}

  public ngOnInit(): void {
    this.isLoading = true;
    this._moviesService
      .getMovies()
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe((movies) => {
        if (movies) {
          this.isLoading = false;
          this.featuredMovie = movies[3];
          this.movies = movies;
        }
      });
  }

  public openDetails(movie: Movie): void {
    this.router.navigate(['/movieDetails'], { state: { movie } });
  }

  public ngOnDestroy(): void {
    this._unsubscribe$.next(true);
    this._unsubscribe$.complete();
  }
}
