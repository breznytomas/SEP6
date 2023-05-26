import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { AppComponent } from './app.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { PersonDetailsComponent } from './components/person-details/person-details.component';
import { LogonComponent } from './components/logon/logon.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'person/:id', component: PersonDetailsComponent },
  { path: 'movieDetails', component: MovieDetailsComponent },
  { path: 'account/logon', component: LogonComponent },
  { path: 'account/register', component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
