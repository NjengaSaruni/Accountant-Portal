import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {LineChart} from '../../models/LineChart/LineChart';

@Component({
  selector: 'app-linechart',
  templateUrl: './linechart.component.html',
  styleUrls: ['./linechart.component.scss']
})
export class LinechartComponent implements OnInit, AfterViewInit {
  @ViewChild('canvas') public canvas: ElementRef;
  @Input() chart: LineChart;
  @Input() fill: boolean;
  private cx: CanvasRenderingContext2D;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
    this.cx = canvasEl.getContext('2d');

    canvasEl.width = this.chart.width;
    canvasEl.height = this.chart.height;

    this.cx.fillStyle = this.chart.backgroundColor;
    this.cx.fillRect(0, 0, canvasEl.width, canvasEl.height);
    this.cx.font = 'normal 10px DejaVu Sans Light, sans-serif';


    // Draw y axis line
    this.cx.beginPath();
    this.cx.moveTo(this.chart.startX, 0);
    this.cx.lineTo(this.chart.startX, this.chart.height - this.chart.startY);
    this.cx.stroke();
    this.cx.closePath();

    // Draw x axis line
    this.cx.beginPath();
    this.cx.moveTo(0, Math.abs(this.chart.startY - this.chart.height));
    this.cx.lineTo(this.chart.width,  Math.abs(this.chart.startY - this.chart.height));
    this.cx.stroke();
    this.cx.closePath();

    // Stroke x axis title
    this.cx.strokeText('Month', this.chart.width / 2,  this.chart.height - 10);

    // Draw Y axis labels and lines;
    for (let i = 0; i < this.chart.height; i += this.chart.intervalY ) {
      const y = this.chart.height - this.chart.startY - i;

      const label = Math.ceil((i / (this.chart.height - (this.chart.startY * 2)) * this.chart.max));
      this.cx.strokeText(label.toString(), 10, y);

      // Set strokeStyle for line
      this.cx.strokeStyle = '#9ccdda';

      // Draw line
      this.cx.beginPath();
      this.cx.moveTo(this.chart.startX - 5, y);
      this.cx.lineTo(this.chart.width - this.chart.endX + 5, y);
      this.cx.stroke();

      // Reset strokeStyle
      this.cx.strokeStyle = 'black';

    }
    // Draw X axis labels & lines
    for (let i = 0; i < this.chart.size(); i++) {
      this.cx.strokeText(this.chart.points[i].title, this.chart.points[i].x, canvasEl.height - 30);
      if (i > 0) {
        // Set strokeStyle for line
        this.cx.strokeStyle = '#9ccdda';

        // Draw line
        this.cx.beginPath();
        this.cx.moveTo(this.chart.points[i].x, Math.abs(this.chart.startY - this.chart.height));
        this.cx.lineTo(this.chart.points[i].x, 0);
        this.cx.stroke();

        // Reset strokeStyle
        this.cx.strokeStyle = 'black';
      }
     }

    // Line styles for actual line
    this.cx.strokeStyle = this.chart.line.color;
    this.cx.lineWidth = this.chart.line.width;
    this.cx.lineCap = 'round';

    // Invert scale
    this.cx.translate(0, canvasEl.height);
    this.cx.scale(1, -1);

    let prev = this.chart.points[0];
    for (let i = 0; i < this.chart.size(); i++) {
      // Draw line
      this.cx.beginPath();
      this.cx.moveTo(prev.x, prev.y);
      this.cx.lineTo(this.chart.points[i].x, this.chart.points[i].y);


      if (this.fill) {
        this.cx.fillStyle = '#41fcff';

        this.cx.lineTo(this.chart.points[i].x, this.chart.startY);
        this.cx.lineTo(prev.x , this.chart.startY);
        this.cx.fill();
      } else {
        this.cx.stroke();
        this.cx.closePath();
      }

      prev = this.chart.points[i];
    }
  }
}
