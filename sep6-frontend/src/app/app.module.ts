import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { MovieCardComponent } from './components/movie-card/movie-card.component';
import { MoviesService } from './services/movies.service';
import { UrlUtil } from './services/urlUtil';
import { PosterService } from './services/poster.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { PersonDetailsComponent } from './components/person-details/person-details.component';
import { PersonService } from './services/person.service';
import { LogonComponent } from './components/logon/logon.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RegisterComponent } from './components/register/register.component';
import { UserService } from './services/user.service';
import { AuthenticationService } from './services/authentication.service';
import { ProfileComponent } from './components/profile/profile.component';
import { SearchResultComponent } from './components/search-result/search-result.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { ToplistService } from './services/toplist.service';
import { ToplistComponent } from './components/toplist/toplist.component';

@NgModule({
  declarations: [
    AppComponent,
    MovieCardComponent,
    MovieDetailsComponent,
    HomePageComponent,
    PersonDetailsComponent,
    LogonComponent,
    RegisterComponent,
    ProfileComponent,
    SearchResultComponent,
    ToplistComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
  ],
  providers: [
    MoviesService,
    UrlUtil,
    PosterService,
    PersonService,
    UserService,
    AuthenticationService,
    ToplistService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
