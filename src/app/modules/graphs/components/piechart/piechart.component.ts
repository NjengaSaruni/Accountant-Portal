import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {PieChart} from '../../../../common/models/graphs/PieChart/PieChart';
import {WindowRefService} from '../../../../common/services/global/window-ref.service';

@Component({
  selector: 'app-piechart',
  templateUrl: './piechart.component.html',
  styleUrls: ['./piechart.component.scss']
})
export class PiechartComponent implements OnInit, AfterViewInit {
  @Input() chart: PieChart;

  @ViewChild('canvas') public canvas: ElementRef;
  private cx: CanvasRenderingContext2D;

  constructor(private winRef: WindowRefService
  ) { }

  public ngAfterViewInit() {
    const initialValue = 0;
    const sum = this.chart.pies.reduce(function (accumulator, pie) {
      return accumulator + pie.angle;
    }, initialValue);
    console.log(sum);
    const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
    canvasEl.height = this.chart.height;
    canvasEl.width = this.chart.width;
    this.cx = canvasEl.getContext('2d');

    const {centerX, centerY} = this.animateGraph();

    // Inner circle
    this.cx.beginPath();
    this.cx.arc(centerX, centerY, 30, 0, 2 * Math.PI);
    this.cx.fillStyle = 'white';
    this.cx.fill();
  }

  private animateGraph() {
    // this.winRef.nativeWindow.requestAnimationFrame(this.animateGraph.bind(this));

    // start at the top
    let currentAngle = -0.5 * Math.PI;
    const centerX = this.chart.outerCircle.radius;
    const centerY = this.chart.outerCircle.radius;

    for (const pie of this.chart.pies) {
      // pie slices
      this.cx.beginPath();
      this.cx.arc(centerX, centerY, this.chart.outerCircle.radius, currentAngle, currentAngle + pie.angle);
      this.cx.lineTo(centerX, centerY);
      this.cx.fillStyle = pie.color;
      this.cx.fill();

      currentAngle += pie.angle;
      const middleAngle = currentAngle + 0.5 * pie.angle;

      // labels
      if (middleAngle < -0.5 * Math.PI || middleAngle > 0.5 * Math.PI) {
        this.cx.textAlign = 'right';
      } else {
        this.cx.textAlign = 'left';
      }
      this.cx.textBaseline = 'middle';
      this.cx.strokeStyle = 'white';
      this.cx.fillStyle = 'white';

    }
    return {centerX, centerY};
  }

  ngOnInit() {

  }

}
