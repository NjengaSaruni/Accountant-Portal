import { Component, OnInit } from '@angular/core';
import {LineChart} from '../../../charts/models/LineChart/LineChart';
import {getMockLinechart} from '../../../shared/utils/randomInt';
import {WindowRefService} from '../../../shared/services/window-ref.service';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss']
})
export class IntroComponent implements OnInit {
  lineChart: LineChart;

  constructor(private winRef: WindowRefService) {
    const width = this.winRef.nativeWindow.innerWidth;
    const chartWidth = width > 600 ? (this.winRef.nativeWindow.innerWidth - 0.1 * this.winRef.nativeWindow.innerWidth)
      / 2 : this.winRef.nativeWindow.innerWidth;
    this.lineChart = getMockLinechart(chartWidth);
    this.lineChart.backgroundColor = 'white';
    this.lineChart.line.color = '#6EC4DB';
  }

  ngOnInit() {
  }

}
