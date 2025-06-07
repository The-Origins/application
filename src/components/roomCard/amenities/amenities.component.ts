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
    workdesk: '/assets/icons/workdesk.svg',
    'bed & breakfast': '/assets/icons/bed-and-breakfast.svg',
    spa: '/assets/icons/spa.svg',
    gym: '/assets/icons/gym.svg',
    'heated pool': '/assets/icons/heated-pool.svg',
    dinner: '/assets/icons/dinner.svg',
    conferencing: '/assets/icons/conferencing.svg',
    bathtub: '/assets/icons/bathtub.svg',
    concierge: '/assets/icons/concierge.svg',
    massage: '/assets/icons/massage.svg',
    '24Hr service': '/assets/icons/service.svg',
    security: '/assets/icons/security.svg',
  };
}
