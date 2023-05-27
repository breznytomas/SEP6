import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { Toplist } from 'src/app/models/toplist';
import { ToplistService } from 'src/app/services/toplist.service';

@Component({
  selector: 'app-toplist',
  templateUrl: './toplist.component.html',
  styleUrls: ['./toplist.component.scss'],
})
export class ToplistComponent implements OnInit, OnDestroy {
  public topLists: Toplist[] = [];
  private _unsubscribe$ = new Subject();

  constructor(private toplistService: ToplistService) {}

  public ngOnInit() {
    this.toplistService.getTopLists().subscribe((toplists: Toplist[]) => {
      this.topLists = toplists;
    });
  }

  public ngOnDestroy(): void {
    this._unsubscribe$.next(true);
    this._unsubscribe$.complete();
  }

  public openDetails(movie: any) {
    //TODO:: set it to be the same as in every other case
  }
}
