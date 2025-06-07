import { ClickAwayDirective } from './click-away.directive';
import { ElementRef } from '@angular/core';
describe('ClickAwayDirective', () => {
  it('should create an instance', () => {
    const directive = new ClickAwayDirective(new ElementRef(document.body));
    expect(directive).toBeTruthy();
  });
});
