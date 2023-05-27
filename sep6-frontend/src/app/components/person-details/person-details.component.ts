import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Movie } from 'src/app/models/movie';
import { Person } from 'src/app/models/person';
import { MoviesService } from 'src/app/services/movies.service';
import { PersonService } from 'src/app/services/person.service';

@Component({
  selector: 'app-person-details',
  templateUrl: './person-details.component.html',
  styleUrls: ['./person-details.component.scss'],
})
export class PersonDetailsComponent implements OnInit, OnDestroy {
  public person: Person;
  public isLoading = false;
  private _unsubscribe$ = new Subject();
  constructor(
    private route: ActivatedRoute,
    private personService: PersonService,
    private moviesService: MoviesService,
    private router: Router
  ) {}

  public ngOnInit() {
    this.isLoading = true;
    const id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.personService
      .getRelatedMovies(id)
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe((person: Person) => {
        this.person = person;
        this.isLoading = false;
      });
  }

  public openDetails(movie: Movie): void {
    this.router.navigate(['/movieDetails'], { state: { movie } });
  }

  public ngOnDestroy(): void {
    this._unsubscribe$.next(true);
    this._unsubscribe$.complete();
  }
}
