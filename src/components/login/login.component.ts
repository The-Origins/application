import { Component, inject } from '@angular/core';
import { StepsService } from '../../services/steps/steps.service';
import { UserService } from '../../services/user/user.service';
import { LoadingRippleComponent } from '../loading-ripple/loading-ripple.component';
import { fadeInOut, topIn } from '../../animations';

@Component({
  selector: 'app-login',
  imports: [LoadingRippleComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  animations: [fadeInOut, topIn],
})
export class LoginComponent {
  isLoading = false;
  stepService = inject(StepsService);
  userService = inject(UserService);

  handleLogin(provider: string) {
    this.isLoading = true;
    this.userService.login(provider);
    setTimeout(() => {
      this.isLoading = false;
      this.stepService.next('profile');
    }, 2000);
  }

  handleBack() {
    this.stepService.back();
  }
}
