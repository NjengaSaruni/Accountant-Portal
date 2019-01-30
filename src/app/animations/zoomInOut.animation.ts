import { trigger, state, style, transition,
  animate, group, query, stagger, keyframes
} from '@angular/animations';

export const zoomInOutAnimation = [
  trigger('zoomInOut', [
    state('in', style({
      'max-height': '500px',
      'max-width': '800px',
      'opacity': 1
    })),
    state('out', style({
      'max-height': '0px',
      'max-width': '0px',
      'opacity': 0
    })),
    transition('in => out', [group([
        animate('200ms ease-in-out', style({
          'opacity': '0'
        })),
        animate('200ms ease-in-out', style({
          'max-height': '0px'
        })),
        animate('200ms ease-in-out', style({
          'max-width': '0px'
        })),
        // animate('700ms ease-in-out', style({
        //   'visibility': 'hidden'
        // }))
      ]
    )]),
    transition('out => in', [group([
        animate('500ms ease-in-out', style({
          'max-height': '500px'
        })),
        animate('500ms ease-in-out', style({
          'max-width': '800px'
        })),
        animate('800ms ease-in-out', style({
          'opacity': '1'
        }))
      ]
    )])
  ]),
];
