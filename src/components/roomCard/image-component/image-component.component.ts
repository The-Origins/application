import { Component, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-image-component',
  imports: [MatIcon],
  templateUrl: './image-component.component.html',
  styleUrl: './image-component.component.scss',
})
export class ImageComponentComponent {
  @Input() images: string[] = [];
  @Input() mode: string = '';

  imageIndex = 0;
  fullScreen = false;

  next() {
    if (this.imageIndex < this.images.length - 1) {
      this.imageIndex++;
    } else {
      this.imageIndex = 0;
    }
  }

  prev() {
    if (this.imageIndex > 0) {
      this.imageIndex--;
    } else {
      this.imageIndex = this.images.length - 1;
    }
  }

  setImageIndex(index: number) {
    this.imageIndex = index;
  }

  toggleFullScreen() {
    this.fullScreen = !this.fullScreen;
  }
}
