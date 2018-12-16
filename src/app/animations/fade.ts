import {trigger, state, style, transition, animate} from '@angular/animations';

export const fade =
  trigger('fade', [
    state('in', style({
      transform: 'translateX(0)',
      opacity: 1
    })),
    state('out', style({
      transform: 'translateX(30px)',
      opacity: 0
    })),
    transition('out => in', animate('250ms ease-out')),
    transition('in => out', animate('250ms'))
  ]);