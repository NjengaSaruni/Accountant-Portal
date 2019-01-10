import {Component} from '@angular/core';
import {Title} from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import {slideInAnimation} from '../animations/route.animation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [slideInAnimation]
})
export class AppComponent {
  constructor(private titleService: Title) {
    this.titleService.setTitle('Accountant | Home');
  }

  getAnimationData(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
