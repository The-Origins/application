import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentMpesaComponent } from './payment-mpesa.component';

describe('PaymentMpesaComponent', () => {
  let component: PaymentMpesaComponent;
  let fixture: ComponentFixture<PaymentMpesaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentMpesaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentMpesaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
