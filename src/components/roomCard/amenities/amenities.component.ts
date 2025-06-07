import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-amenities',
  imports: [CommonModule],
  templateUrl: './amenities.component.html',
  styleUrl: './amenities.component.scss',
})
export class AmenitiesComponent {
  @Input() amenities: string[] = [];
  icons: Record<string, string> = {
    workdesk: 'assets/workdesk.svg',
    'bed & breakfast': 'assets/bed-and-breakfast.svg',
    spa: 'assets/spa.svg',
    gym: 'assets/gym.svg',
    'heated pool': 'assets/heated-pool.svg',
    dinner: 'assets/dinner.svg',
    conferencing: 'assets/conferencing.svg',
    bathtub: 'assets/bathtub.svg',
    concierge: 'assets/concierge.svg',
    massage: 'assets/massage.svg',
    '24Hr service': 'assets/service.svg',
    security: 'assets/security.svg',
  };
}
