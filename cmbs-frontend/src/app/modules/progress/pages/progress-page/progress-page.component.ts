import { Component } from '@angular/core';

@Component({
  selector: 'app-progress-page',
  templateUrl: './progress-page.component.html',
  styleUrl: './progress-page.component.css',
})
export class ProgressPageComponent {


  public progressOne: number = 0;
  public progressTwo: number = 0;

  public get currentProgressOne (): string {
    return `${this.progressOne}%`;
  }

  public get currentProgressTwo (): string {
    return `${this.progressTwo}%`;
  }

  public onIncrementOrDecrementPercentage(value: number): void {
    this.progressOne = value;
  }

  public onIncrementOrDecrementPercentageTwo(value: number): void {
    this.progressTwo = value;
  }
}
