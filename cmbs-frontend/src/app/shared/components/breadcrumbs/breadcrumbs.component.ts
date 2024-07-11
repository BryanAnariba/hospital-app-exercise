import { Component, OnDestroy } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { filter, map, Subscription, tap } from 'rxjs';

@Component({
  selector: 'app-shared-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrl: './breadcrumbs.component.css'
})
export class BreadcrumbsComponent implements OnDestroy {
  
  public title: string = '';
  public titleSubscription$?: Subscription;

  constructor (
    private readonly router: Router
  ) {
    this.titleSubscription$ = this.getRoute();
  }

  ngOnDestroy(): void {
    this.titleSubscription$?.unsubscribe();
  }

  public getRoute () {
    return this.router.events
      .pipe(
        filter(event => event instanceof ActivationEnd),
        filter((event: any) => event.snapshot.firstChild === null),
        tap(event => console.log(event)),
        map((event: ActivationEnd) => event.snapshot.data as any),
      )
      .subscribe({
        next: (data) => {
          // console.log({data});
          this.title = data.title;
        }
      });
  }
}
