import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StepsService {
  private stepsSubject = new BehaviorSubject<string[]>(['home']);

  steps$ = this.stepsSubject.asObservable();

  getSteps() {
    return this.stepsSubject.getValue();
  }

  back() {
    const current = this.getSteps();

    current.pop();

    this.stepsSubject.next(current);
  }

  next(step: string) {
    const current = this.getSteps();

    current.push(step);

    this.stepsSubject.next(current);
  }

  reset() {
    this.stepsSubject.next(['home']);
  }
}
