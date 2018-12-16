import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-piechart',
  templateUrl: './piechart.component.html',
  styleUrls: ['./piechart.component.scss']
})
export class PiechartComponent implements OnInit, AfterViewInit {
  @Input() max: number;
  @ViewChild('svg') public svg: ElementRef;

  getCoordinatesForPercent(percent) {
    const x = Math.cos(2 * Math.PI * percent);
    const y = Math.sin(2 * Math.PI * percent);

    return [x, y];
  }

  constructor(
  ) { }

  public ngAfterViewInit() {
    this.svg = HTMLs
  }
  ngOnInit(
  ) {
  }

}
