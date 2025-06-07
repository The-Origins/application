import { trigger, transition, style, animate } from '@angular/animations';

export const fadeInOut = trigger('fadeInOut', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('300ms ease-in-out', style({ opacity: 1 })),
  ]),
  transition(':leave', [animate('300ms ease-in-out', style({ opacity: 0 }))]),
]);

export const fadeIn = trigger('fadeIn', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('300ms ease-out', style({ opacity: 1 })),
  ]),
]);

export const topDownGrow = trigger('topDownGrow', [
  transition(':enter', [
    style({ transform: 'scaleY(0)', transformOrigin: 'top' }),
    animate('300ms ease-out', style({ transform: 'scaleY(1)' })),
  ]),
  transition(':leave', [
    style({ transform: 'scaleY(1)', transformOrigin: 'top' }),
    animate('300ms ease-in', style({ transform: 'scaleY(0)' })),
  ]),
]);

export const leftIn = trigger('leftIn', [
  transition(':enter', [
    style({ transform: 'translateX(-100%)' }),
    animate('500ms ease-in-out', style({ transform: 'translateX(0)' })),
  ]),
]);

export const leftOut = trigger('leftOut', [
  transition(':leave', [
    style({ transform: 'translateX(0)' }),
    animate('500ms ease-in-out', style({ transform: 'translateX(-100%)' })),
  ]),
]);

export const bottomIn = trigger('bottomIn', [
  transition(':enter', [
    style({ transform: 'translateY(100%)' }),
    animate('500ms ease-in-out', style({ transform: 'translateY(0)' })),
  ]),
]);

export const topIn = trigger('topIn', [
  transition(':enter', [
    style({ transform: 'translateY(-100%)' }),
    animate('500ms ease-in-out', style({ transform: 'translateY(0)' })),
  ]),
]);
