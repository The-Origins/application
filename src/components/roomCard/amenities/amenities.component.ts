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
    workdesk: 'workdesk.svg',
    'bed & breakfast': 'bed-and-breakfast.svg',
    spa: 'spa.svg',
    gym: 'gym.svg',
    'heated pool': 'heated-pool.svg',
    dinner: 'dinner.svg',
    conferencing: 'conferencing.svg',
    bathtub: 'bathtub.svg',
    concierge: 'concierge.svg',
    massage: 'massage.svg',
    '24Hr service': 'service.svg',
    security: 'security.svg',
  };
}
