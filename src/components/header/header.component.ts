import { Component, HostListener, inject } from '@angular/core';
import { UserService, UserServiceUser } from '../../services/user/user.service';
import { MatIconModule } from '@angular/material/icon';
import { StepsService } from '../../services/steps/steps.service';
import { LoadingRippleComponent } from '../loading-ripple/loading-ripple.component';

@Component({
  selector: 'app-header',
  imports: [MatIconModule, LoadingRippleComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  stepsService = inject(StepsService);
  userService = inject(UserService);
  user: UserServiceUser | null = null;

  isHeaderVisible = false;
  isLoading = true;

  goToProfile() {
    this.stepsService.next('profile');
  }

  login() {
    this.stepsService.next('login');
  }

  logout() {
    this.userService.logout();
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    this.isHeaderVisible = window.scrollY > 300;
  }

  constructor() {
    this.userService.user$.subscribe((user) => {
      this.user = user;
      if (!user.isLoading) {
        setTimeout(() => (this.isLoading = false), 0);
      }
    });
  }
}
