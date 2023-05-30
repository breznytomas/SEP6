import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, forkJoin, takeUntil } from 'rxjs';
import { Movie } from 'src/app/models/movie';
import { Star } from 'src/app/models/star';
import { Toplist } from 'src/app/models/toplist';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { MoviesService } from 'src/app/services/movies.service';
import { PosterService } from 'src/app/services/poster.service';
import { ToplistService } from 'src/app/services/toplist.service';

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
  public showToplistSelect: boolean = false;
  public selectedToplist: number;
  public toplists: Toplist[];
  public isUser: boolean = false;

  public constructor(
    private router: Router,
    private posterService: PosterService,
    private moviesService: MoviesService,
    private toplistService: ToplistService,
    private authService: AuthenticationService
  ) {}

  public ngOnInit(): void {
    let movieId = history.state.movie.id;
    this.isUser = this.authService.isUser;
    this.isLoading = true;
    forkJoin({
      movieDetails: this.moviesService
        .getMovieDetails(movieId)
        .pipe(takeUntil(this._unsubscribe$)),
      poster: this.posterService
        .getPoster(movieId, true)
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
    if (this.isUser)
      this.toplistService
        .getTopLists()
        .pipe(takeUntil(this._unsubscribe$))
        .subscribe((toplists) => {
          if (toplists) {
            this.toplists = toplists;
          }
        });
  }

  public goBack(): void {
    this.router.navigate(['/movies']);
  }

  public addMovieToToplist(): void {
    this.showToplistSelect = false;
    this.toplistService
      .addMovieToToplist(this.selectedToplist, this.movie.id)
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe();
  }

  public ngOnDestroy(): void {
    this._unsubscribe$.next(true);
    this._unsubscribe$.complete();
  }
}
