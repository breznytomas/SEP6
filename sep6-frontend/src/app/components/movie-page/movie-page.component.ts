import { Component, Input, OnInit } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { movie } from 'src/app/models/movie';
import { posterService } from 'src/app/services/poster.service';

@Component({
  selector: 'app-movie-page',
  templateUrl: './movie-page.component.html',
  styleUrls: ['./movie-page.component.scss'],
})
export class MoviePageComponent implements OnInit {
  private _unsubscribe$ = new Subject();

  public movies: movie[];
  private _movie: movie;
  public posterUri: string;
  @Input() public set movie(movie: movie) {
    if (movie) {
      this._movie = movie;

      //temporary hack -> in the future fetch only new movies from db
      this.posterService
        .getPoster(`tt00${movie.id}`)
        .pipe(takeUntil(this._unsubscribe$))
        .subscribe((uri) => {
          this.posterUri = uri;
        });
    }
  }
  public constructor(private posterService: posterService) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this._unsubscribe$.next(true);
    this._unsubscribe$.complete();
  }
}
