import { trigger, state, style, transition,
  animate, group, query, stagger, keyframes
} from '@angular/animations';

export const SlideInOutAnimation = [
  trigger('slideInOut', [
    state('in', style({
      'max-height': '500px',
      'opacity': 1
    })),
    state('out', style({
      'max-height': '0px',
      'opacity': 0
    })),
    transition('in => out', [group([
        animate('0ms ease-in-out', style({
          'opacity': '0'
        })),
        animate('0ms ease-in-out', style({
          'max-height': '0px'
        })),
      ]
    )]),
    transition('out => in', [group([
        animate('500ms ease-in-out', style({
          'max-height': '500px'
        })),
        animate('400ms ease-in-out', style({
          'opacity': '1'
        }))
      ]
    )])
  ]),
];
