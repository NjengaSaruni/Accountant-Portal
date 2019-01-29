import { trigger, state, style, transition,
  animate, group, query, stagger, keyframes
} from '@angular/animations';

export const SlideInOutAnimation = [
  trigger('slideInOut', [
    state('in', style({
      'max-height': '500px'
    })),
    state('out', style({
      'max-height': '0px'
    })),
    transition('in => out', [group([
        // animate('400ms ease-in-out', style({
        //   'opacity': '0'
        // })),
        animate('100ms ease-in-out', style({
          'max-height': '0px'
        })),
        // animate('700ms ease-in-out', style({
        //   'visibility': 'hidden'
        // }))
      ]
    )]),
    transition('out => in', [group([
        // animate('1ms ease-in-out', style({
        //   'visibility': 'visible'
        // })),
        animate('300ms ease-in-out', style({
          'max-height': '500px'
        })),
        // animate('800ms ease-in-out', style({
        //   'opacity': '1'
        // }))
      ]
    )])
  ]),
]
