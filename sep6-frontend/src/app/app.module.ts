import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { MoviePageComponent } from './components/movie-page/movie-page.component';
import { moviesService } from './services/movies.service';
import { UrlUtil } from './services/urlUtil';
import { posterService } from './services/poster.service';

@NgModule({
  declarations: [AppComponent, MoviePageComponent],
  imports: [BrowserModule, HttpClientModule, AppRoutingModule],
  providers: [moviesService, UrlUtil, posterService],
  bootstrap: [AppComponent],
})
export class AppModule {}
