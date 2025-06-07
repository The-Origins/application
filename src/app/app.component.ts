import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainComponent } from '../components/main/main.component';
import { StepsService } from '../services/steps/steps.service';
import { RoomComponent } from '../components/room/room.component';
import { CheckoutComponent } from '../components/checkout/checkout.component';
import { ProfileComponent } from '../components/profile/profile.component';
import { BookingComponent } from '../components/booking/booking.component';
import { ResultsComponent } from '../components/results/results.component';
import { LoginComponent } from '../components/login/login.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    MainComponent,
    RoomComponent,
    CheckoutComponent,
    ProfileComponent,
    BookingComponent,
    ResultsComponent,
    LoginComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  steps: string[] = ['home'];
  step: string = 'home';

  constructor(private stepsService: StepsService) {
    this.stepsService.steps$.subscribe((steps) => {
      this.steps = steps;
      this.step = steps[steps.length - 1];
    });
  }
}
