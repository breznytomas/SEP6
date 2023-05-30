import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-logon',
  templateUrl: './logon.component.html',
  styleUrls: ['./logon.component.scss'],
})
export class LogonComponent implements OnInit, OnDestroy {
  public loginForm: FormGroup;
  private _unsubscribe$ = new Subject();
  public isLoading = false;
  public error = '';

  public constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService
  ) {}

  public ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  public onSubmit(): void {
    this.isLoading = true;
    if (this.loginForm.valid) {
      const email = this.loginForm.get('email')?.value;
      const password = this.loginForm.get('password')?.value;
      this.authService.login(email, password).subscribe(
        () => {
          this.isLoading = false;
        },
        (error) => {
          this.error = 'Invalid username or password. Please try again.';
          this.isLoading = false;
        }
      );
    } else {
      this.error = 'form is invalid';
      this.isLoading = false;
    }
  }

  public ngOnDestroy(): void {
    this._unsubscribe$.next(true);
    this._unsubscribe$.complete();
  }
}
