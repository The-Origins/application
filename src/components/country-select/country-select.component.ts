import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ReactiveFormsModule } from '@angular/forms';
import countries from '../../data/countries.json';
import { ClickAwayDirective } from '../../directives/click-away.directive';
import { map, Observable, startWith } from 'rxjs';

@Component({
  selector: 'app-country-select',
  imports: [
    CommonModule,
    MatIconModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    ClickAwayDirective,
  ],
  templateUrl: './country-select.component.html',
  styleUrl: './country-select.component.scss',
})
export class CountrySelectComponent implements OnInit {
  @Output() onSelect = new EventEmitter<string>();
  @Input() country: string | null | undefined = '';
  @Input() error: string = '';
  @Input() touched: boolean = false;
  @Output() onBlur = new EventEmitter<void>();

  @ViewChild('input') input!: ElementRef;

  open = false;
  search = new FormControl('');

  filteredCountries: Observable<string[]> = new Observable();

  handleOpen = () => {
    this.open = true;
    setTimeout(() => {
      this.input.nativeElement.focus();
    }, 100);
  };

  handleBlur = () => {
    if (!this.touched) {
      this.onBlur.emit();
    }
  };

  handleClickAway = () => {
    this.open = false;
  };

  getImageUrl = (country: string) => {
    return `https://flagcdn.com/w20/${countries[
      country as keyof typeof countries
    ].code.toLowerCase()}.png`;
  };

  handleSelect(country: string) {
    this.search.setValue(country);
    this.onSelect.emit(country);
  }

  ngOnInit(): void {

    this.filteredCountries = this.search.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    );
  }

  private _filter = (value: string): string[] => {
    return Object.keys(countries).filter((country) => {
      return this._normalizeValue(
        `${country}${countries[country as keyof typeof countries].code}${
          countries[country as keyof typeof countries].phone
        }`
      ).includes(this._normalizeValue(value));
    });
  };

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }
}
