import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
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
  private _isFeatured: boolean = false;
  @Input() public set isFeatured(isFeatured: boolean) {
    this._isFeatured = isFeatured;
    this.cdr.detectChanges();
  }
  @Input() public set movie(movie: Movie) {
    if (movie) {
      this.posterService
        .getPoster(movie.id, this.isFeatured)
        .pipe(takeUntil(this._unsubscribe$))
        .subscribe((uri) => {
          if (uri) {
            this.posterUri = uri;
          } else {
            this.posterUri = 'assets/no-img.jpeg';
            this.isPoster = false;
          }
          this._movie = movie;
        });
    }
  }

  public constructor(
    private posterService: PosterService,
    private cdr: ChangeDetectorRef
  ) {}

  public ngOnInit(): void {}

  public get isFeatured(): boolean {
    return this._isFeatured;
  }

  public get movie(): Movie {
    return this._movie;
  }

  public ngOnDestroy(): void {
    this._unsubscribe$.next(true);
    this._unsubscribe$.complete();
  }
}
