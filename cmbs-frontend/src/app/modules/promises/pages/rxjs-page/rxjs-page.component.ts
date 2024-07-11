import { Component, OnDestroy } from '@angular/core';
import { filter, interval, map, Observable, Subscription, take } from 'rxjs';

@Component({
  selector: 'app-rxjs-page',
  templateUrl: './rxjs-page.component.html',
  styleUrl: './rxjs-page.component.css'
})
export class RxjsPageComponent implements OnDestroy {

  public intervalSubscription?: Subscription;

  constructor () {

    /*this.returnObs()
      .pipe(
        retry()
      )
      .subscribe({
      next: (value) => {
        console.log({value});
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        console.log('SUBSCRIBE COMPLETE!!!!!!!!!!');
      }
    });*/

    this.intervalSubscription = this.returnIntervalObservable()
      .subscribe({
        next: (value) => {
          console.log(value);
        },
        error: (error) => {
          console.error(error);
        },
        complete: () => {
          console.log('returnIntervalObservable executed!!!');
        },
      });
  }

  ngOnDestroy(): void {
    this.intervalSubscription?.unsubscribe();
  }

  public returnIntervalObservable () {
    const interval$ = interval(1000);
    return interval$
    .pipe(
      take( // Cuantas veses quieres que se ejecute el observable
        10,
      ),
      map( // Modifica la informacion que retorna el observable
        value => value * value,
      ),
      filter( // Filtrador, cuando el value sea par que lo pase.
        value => value % 2 === 0,
      )
    );    
  }

  public returnObs (): Observable<number> {
    let i = -1;
    return new Observable<number>(observer => {
      const interval = setInterval(() => {
        i++;
        observer.next(i);
        if (i === 4) {
          clearInterval(interval);
          observer.complete();
        }

        if (i === 2) {
          // i = 0;
          console.log('i===2');
          observer.error('Debe mirar los ticks o notificaciones tiene muchos en la bandeja');
        }
      }, 1000);
    });
  }
}
