import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loading-ripple',
  imports: [],
  templateUrl: './loading-ripple.component.html',
  styleUrl: './loading-ripple.component.scss',
})
export class LoadingRippleComponent {
  @Input() width: number | string = '40px';
  @Input() height: number | string = '40px';
}
