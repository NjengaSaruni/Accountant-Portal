import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {PieChart} from '../../models/PieChart/PieChart';
import {WindowRefService} from '../../../shared/services/window-ref.service';

@Component({
  selector: 'app-piechart',
  templateUrl: './piechart.component.html',
  styleUrls: ['./piechart.component.scss']
})
export class PiechartComponent implements OnInit, AfterViewInit {
  @Input() chart: PieChart;

  @ViewChild('canvas1') public canvas: ElementRef;
  private cx: CanvasRenderingContext2D;

  constructor(private winRef: WindowRefService
  ) { }

  public ngAfterViewInit() {
    const initialValue = 0;
    const sum = this.chart.pies.reduce(function (accumulator, pie) {
      return accumulator + pie.angle;
    }, initialValue);
    const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
    canvasEl.height = this.chart.height;
    canvasEl.width = this.chart.width;
    this.cx = canvasEl.getContext('2d');

    this.animateGraph();
  }

  private animateGraph() {
    // start at the top
    let currentAngle = -0.5 * Math.PI;
    for (const pie of this.chart.pies) {
      // pie slices
      this.cx.beginPath();
      this.cx.arc(
        this.chart.outerCircle.radius,
        this.chart.outerCircle.radius,
        this.chart.outerCircle.radius,
        currentAngle, currentAngle + pie.rendered_angle
      );
      this.cx.lineTo(this.chart.outerCircle.radius, this.chart.outerCircle.radius);
      this.cx.fillStyle = pie.color;
      this.cx.fill();

      if (pie.rendered_angle < pie.angle) {
        pie.rendered_angle += 0.12;
      } else {
        pie.rendered_angle = pie.angle;
      }

      currentAngle += pie.angle;
      const middleAngle = currentAngle + 0.5 * pie.angle;

    }

    // Inner circle
    this.cx.beginPath();
    this.cx.arc(this.chart.outerCircle.radius, this.chart.outerCircle.radius, this.chart.innerCircle.radius, 0, 2 * Math.PI);
    this.cx.fillStyle = 'white';
    this.cx.fill();
    this.winRef.nativeWindow.requestAnimationFrame(this.animateGraph.bind(this));

    this.cx.strokeStyle = 'black';
    this.cx.textAlign = 'center';
    this.cx.font = '15px Overpass';
    this.cx.fillStyle = 'black';
    this.cx.fillText('Total' , this.chart.outerCircle.radius, this.chart.outerCircle.radius - 10);
    this.cx.fillText( this.chart.total.toString() + ' KES', this.chart.outerCircle.radius, this.chart.outerCircle.radius + 10);
  }

  ngOnInit() {

  }

}
