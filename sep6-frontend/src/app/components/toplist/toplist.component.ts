import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Toplist } from 'src/app/models/toplist';
import { ToplistService } from 'src/app/services/toplist.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-toplist',
  templateUrl: './toplist.component.html',
  styleUrls: ['./toplist.component.scss'],
})
export class ToplistComponent implements OnInit, OnDestroy {
  public topLists: Toplist[] = [];
  private _unsubscribe$ = new Subject();
  public showCreateForm = false;
  public createToplistForm: FormGroup;

  constructor(
    private toplistService: ToplistService,
    private fb: FormBuilder
  ) {}

  public ngOnInit() {
    this.createToplistForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
    });

    this.toplistService
      .getTopLists()
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe((toplists: Toplist[]) => {
        this.topLists = toplists;
      });
  }

  public ngOnDestroy(): void {
    this._unsubscribe$.next(true);
    this._unsubscribe$.complete();
  }

  public openDetails(movie: any) {}

  public deleteMovie(movieId: number, toplistId: number) {
    const toplist = this.topLists.find((t) => t.id == toplistId);
    if (toplist) {
      toplist.movies = toplist.movies.filter((movie) => movie.id != movieId);
    }
    this.toplistService
      .deleteMovieFromToplist(toplistId, movieId)
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe();
  }

  public deleteToplist(id: number) {
    this.topLists = this.topLists.filter((t) => t.id != id);
    this.toplistService
      .deleteToplist(id)
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe();
  }

  public createToplist() {
    if (this.createToplistForm.valid) {
      this.toplistService
        .createToplist(this.createToplistForm.value)
        .pipe(takeUntil(this._unsubscribe$))
        .subscribe((toplist) => this.topLists.push(toplist));

      this.createToplistForm.reset();
      this.showCreateForm = false;
    }
  }

  public cancel() {
    this.showCreateForm = false;
    this.createToplistForm.reset();
  }
}
