import {
  Component,
  ElementRef,
  inject,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import locations from '../../data/locations.json';
import { QueryFormService } from '../../services/query-form/query-form.service';

@Component({
  selector: 'app-location-nav',
  imports: [CommonModule],
  templateUrl: './location-nav.component.html',
  styleUrl: './location-nav.component.scss',
})
export class LocationNavComponent {
  locations = ['all', ...locations];
  queryForm = inject(QueryFormService).getForm();

  dashLeft = 0;
  dashWidth = 0;

  handleChange(location: string, btn: HTMLButtonElement) {
    this.queryForm.get('location')?.setValue(location);
    this.dashLeft = btn.offsetLeft;
    this.dashWidth = btn.offsetWidth;
  }

  @ViewChildren('btn') buttons!: QueryList<ElementRef<HTMLButtonElement>>;

  ngAfterViewInit() {
    setTimeout(() => this.setInitialDash(), 0);
    // Watch for value changes in case it's set externally
    this.queryForm.valueChanges.subscribe(() => this.setInitialDash());
  }

  setInitialDash() {
    const activeIndex = this.locations.indexOf(this.queryForm.value.location);
    const activeBtn = this.buttons.get(activeIndex);
    if (activeBtn) {
      const el = activeBtn.nativeElement;
      this.dashLeft = el.offsetLeft;
      this.dashWidth = el.offsetWidth;
    }
  }
}
