import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promise-page',
  templateUrl: './promise-page.component.html',
  styleUrl: './promise-page.component.css'
})
export class PromisePageComponent implements OnInit {

  ngOnInit(): void {
    const newPromise = new Promise((resolve, reject) => {
      const isOk: boolean = true;
      if (isOk) {
        resolve('Hello World');
      } else {
        reject('Sometime went wrong');
      }
    });

    newPromise
      .then(result => console.log(result))
      .catch(error => console.error(error));

    this.getUsers()
      .then(users => console.log(users));

    console.log('End ngOnInit')
  }

  public getUsers () {
    return new Promise((resolve) => {
      fetch('https://reqres.in/api/users?page=2')
        .then(res => res.json())
        .then(res => resolve(res.data));
    });
  }
}
