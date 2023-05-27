import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, forkJoin, takeUntil } from 'rxjs';
import { Movie } from 'src/app/models/movie';
import { Star } from 'src/app/models/star';
import { MoviesService } from 'src/app/services/movies.service';
import { PosterService } from 'src/app/services/poster.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
})
export class MovieDetailsComponent implements OnInit, OnDestroy {
  public movie: any;
  public stars: Star[];
  public posterUri: string;
  public isPoster: boolean = true;
  private _unsubscribe$ = new Subject();
  public isLoading: boolean = false;

  public constructor(
    private router: Router,
    private posterService: PosterService,
    private moviesService: MoviesService
  ) {}

  public ngOnInit(): void {
    let movieId = history.state.movie.id;
    this.isLoading = true;
    forkJoin({
      movieDetails: this.moviesService
        .getMovieDetails(movieId)
        .pipe(takeUntil(this._unsubscribe$)),
      poster: this.posterService
        .getPoster(`tt00${movieId}`, true)
        .pipe(takeUntil(this._unsubscribe$)),
    }).subscribe(({ movieDetails, poster }) => {
      this.isLoading = false;
      if (movieDetails) {
        this.movie = movieDetails;
        this.stars = movieDetails.stars;
      }

      if (poster) {
        this.posterUri = poster;
      } else {
        this.posterUri = 'assets/no-img.jpeg';
        this.isPoster = false;
      }
    });

    console.log(this.stars);
  }

  public goBack(): void {
    this.router.navigate(['/movies']);
  }

  public ngOnDestroy(): void {
    this._unsubscribe$.next(true);
    this._unsubscribe$.complete();
  }
}
