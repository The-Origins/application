import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Status } from '../../types/common';
import { CommonModule } from '@angular/common';
import { LoadingRippleComponent } from "../loading-ripple/loading-ripple.component";

@Component({
  selector: 'app-status',
  imports: [MatIconModule, CommonModule, LoadingRippleComponent],
  templateUrl: './status.component.html',
  styleUrl: './status.component.scss',
})
export class StatusComponent {
  @Input() status: Status = {
    on: false,
    type: 'loading',
    action: {
      callback: () => {},
    },
  };

  @Output() click = new EventEmitter<void>();

  handleClick = () => {
    this.click.emit();
  };
}
