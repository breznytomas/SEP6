import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  public user: User;
  private _unsubscribe$ = new Subject();

  constructor(private authService: AuthenticationService) {}

  ngOnInit(): void {
    this.authService.currentUser
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe((u) => {
        console.log(u);
        this.user = u;
      });
  }

  public ngOnDestroy(): void {
    this._unsubscribe$.next(true);
    this._unsubscribe$.complete();
  }
}
