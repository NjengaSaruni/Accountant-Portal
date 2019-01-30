import { trigger, state, style, transition,
  animate, group, query, stagger, keyframes
} from '@angular/animations';

export const SlideInOutAnimationSlow = [
  trigger('slideInOutSlow', [
    state('in', style({
      'max-height': '200px',
      'opacity': 1
    })),
    state('out', style({
      'max-height': '0px',
      'opacity': 0
    })),
    transition('in => out', [group([
        animate('500ms ease-in-out', style({
          'opacity': '0'
        })),
        animate('500ms ease-in-out', style({
          'max-height': '0px'
        })),
      ]
    )]),
    transition('out => in', [group([
        animate('2000ms ease-in-out', style({
          'max-height': '200px'
        })),
        animate('700ms ease-in-out', style({
          'opacity': '1'
        }))
      ]
    )])
  ]),
];
