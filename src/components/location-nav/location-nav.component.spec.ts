import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationNavComponent } from './location-nav.component';

describe('LocationNavComponent', () => {
  let component: LocationNavComponent;
  let fixture: ComponentFixture<LocationNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LocationNavComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocationNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
