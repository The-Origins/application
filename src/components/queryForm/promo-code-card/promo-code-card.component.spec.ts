import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromoCodeCardComponent } from './promo-code-card.component';

describe('PromoCodeCardComponent', () => {
  let component: PromoCodeCardComponent;
  let fixture: ComponentFixture<PromoCodeCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PromoCodeCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PromoCodeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
