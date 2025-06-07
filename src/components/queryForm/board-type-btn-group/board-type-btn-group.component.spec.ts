import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardTypeBtnGroupComponent } from './board-type-btn-group.component';

describe('BoardTypeBtnGroupComponent', () => {
  let component: BoardTypeBtnGroupComponent;
  let fixture: ComponentFixture<BoardTypeBtnGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoardTypeBtnGroupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoardTypeBtnGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
