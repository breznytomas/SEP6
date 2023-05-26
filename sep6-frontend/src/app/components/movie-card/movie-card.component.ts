import { Component, Input, OnInit } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Movie } from 'src/app/models/movie';
import { PosterService } from 'src/app/services/poster.service';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent implements OnInit {
  private _unsubscribe$ = new Subject();

  public movies: Movie[];
  private _movie: Movie;
  public posterUri: string;
  public isPoster: boolean = true;

  @Input() public set movie(movie: Movie) {
    if (movie) {
      this._movie = movie;

      // temporary hack -> in the future fetch only new movies from db so no need to add 00
      this.posterService
        .getPoster(`tt00${movie.id}`, this.isFeatured)
        .pipe(takeUntil(this._unsubscribe$))
        .subscribe((uri) => {
          if (uri) {
            this.posterUri = uri;
          } else {
            this.posterUri = 'assets/no-img.jpeg';
            this.isPoster = false;
          }
        });
    }
  }

  @Input() public isFeatured: boolean = false;
  public constructor(private posterService: PosterService) {}

  public ngOnInit(): void {}

  public ngOnDestroy(): void {
    this._unsubscribe$.next(true);
    this._unsubscribe$.complete();
  }
}
