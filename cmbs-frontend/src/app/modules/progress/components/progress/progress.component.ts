import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrl: './progress.component.css'
})
export class ProgressComponent implements OnInit {

  ngOnInit(): void {
    this.btnClassName = `${this.btnClassName}`;
  }

  @Input()
  public btnClassName: string = 'btn bt-primary';

  @Input()
  public progressInitialValue: number = 0;

  @Output()
  public onReceiveProgressIncrementOrDecrementValue: EventEmitter<number> = new EventEmitter<number>();

  public onIncrementOrDecrementPercentage(value: number): void {
    if (this.progressInitialValue >= 100 && value >= 0) {
      this.onReceiveProgressIncrementOrDecrementValue.emit(100);
      this.progressInitialValue=100;
    } else if (this.progressInitialValue <= 0 && value < 0) {
      this.progressInitialValue = 0;
      this.onReceiveProgressIncrementOrDecrementValue.emit(0);
    } else {
      this.progressInitialValue += value;
      this.onReceiveProgressIncrementOrDecrementValue.emit(this.progressInitialValue);
    }
  }

  public onChange(value: number): void {
    if (value >= 100) {
      this.progressInitialValue = 100;
    } else if (value <= 0) {
      this.progressInitialValue = 0;
    } else {
      this.progressInitialValue = value;
    }
    this.onReceiveProgressIncrementOrDecrementValue.emit(this.progressInitialValue);
  }
}
