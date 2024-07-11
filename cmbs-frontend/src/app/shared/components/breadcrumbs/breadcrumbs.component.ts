import { Component, ɵSSR_CONTENT_INTEGRITY_MARKER } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { filter, map, tap } from 'rxjs';

@Component({
  selector: 'app-shared-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrl: './breadcrumbs.component.css'
})
export class BreadcrumbsComponent {

  constructor (
    private readonly router: Router
  ) {
    this.router.events
      .pipe(
        filter((event) => (event instanceof ActivationEnd)), // El primero de estos tiene el path ej: users, doctors, hospitals etc...
        filter((event: ActivationEnd) => event.snapshot.firstChild === null),
        map((event: ActivationEnd) => event.snapshot.data as any),
      )
      .subscribe({
        next: ({title}) => {
          console.log(title);
        }
      });
  }
}
