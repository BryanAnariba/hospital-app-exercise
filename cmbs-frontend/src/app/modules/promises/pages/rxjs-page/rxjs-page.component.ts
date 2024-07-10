import { Component } from '@angular/core';
import { Observable, retry } from 'rxjs';

@Component({
  selector: 'app-rxjs-page',
  templateUrl: './rxjs-page.component.html',
  styleUrl: './rxjs-page.component.css'
})
export class RxjsPageComponent {

  constructor () {
    let i = -1;
    const obs$ = new Observable(observer => {
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

    obs$
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
    });
  }
}
