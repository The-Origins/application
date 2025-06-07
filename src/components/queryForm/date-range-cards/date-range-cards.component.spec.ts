import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateRangeCardsComponent } from './date-range-cards.component';

describe('DateRangeCardsComponent', () => {
  let component: DateRangeCardsComponent;
  let fixture: ComponentFixture<DateRangeCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DateRangeCardsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DateRangeCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
