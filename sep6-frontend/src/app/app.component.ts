import { Component, OnDestroy, OnInit } from '@angular/core';
import { Movie } from './models/movie';
import { MoviesService } from './services/movies.service';
import { Subject, map, takeUntil } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  public movies: Movie[];
  public featuredMovie: Movie;
  public showSearch = false;
  private _unsubscribe$ = new Subject();
  selectedMovie: Movie;

  public constructor(private router: Router) {}

  ngOnInit(): void {}

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
