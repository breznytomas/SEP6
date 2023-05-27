import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, distinctUntilChanged, switchMap, takeUntil, tap } from 'rxjs';
import { Movie } from 'src/app/models/movie';
import { SearchResult } from 'src/app/models/search-result';
import { Star } from 'src/app/models/star';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss'],
})
export class SearchResultComponent implements OnInit, OnDestroy {
  private _unsubscribe$ = new Subject();
  public isLoading = false;
  public error: string = '';
  @Input() public searchTerm: string;
  searchResult: { movies: Movie[]; people: Star[] };

  public constructor(
    private route: ActivatedRoute,
    private moviesService: MoviesService,
    private router: Router
  ) {}

  public ngOnInit() {
    this.isLoading = false;
    this.route.paramMap
      .pipe(
        distinctUntilChanged(),
        takeUntil(this._unsubscribe$),
        tap(() => {
          this.error = null;
          this.isLoading = true;
        }),
        switchMap((params) => this.moviesService.search(params.get('term')))
      )
      .subscribe((results) => {
        this.isLoading = false;
        if (results) {
          this.searchResult = results;
        } else {
          this.error =
            'No movies/people found. Try again using different search term';
        }
      });
  }

  public openDetails(movie: Movie) {
    this.router.navigate(['/movieDetails'], { state: { movie } });
  }
  public ngOnDestroy(): void {
    this._unsubscribe$.next(true);
    this._unsubscribe$.complete();
  }
}
