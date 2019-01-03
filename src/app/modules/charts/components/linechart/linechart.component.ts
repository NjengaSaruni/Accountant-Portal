import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {LineChart} from '../../models/LineChart/LineChart';

@Component({
  selector: 'app-linechart',
  templateUrl: './linechart.component.html',
  styleUrls: ['./linechart.component.scss']
})
export class LinechartComponent implements OnInit, AfterViewInit {
  @ViewChild('canvas') public canvas: ElementRef;
  @Input() graph: LineChart;
  @Input() fill: boolean;
  private cx: CanvasRenderingContext2D;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
    this.cx = canvasEl.getContext('2d');

    canvasEl.width = this.graph.width;
    canvasEl.height = this.graph.height;

    this.cx.fillStyle = this.graph.backgroundColor;
    this.cx.fillRect(0, 0, canvasEl.width, canvasEl.height);
    this.cx.font = 'normal 10px DejaVu Sans Light, sans-serif';


    // Draw y axis line
    this.cx.beginPath();
    this.cx.moveTo(this.graph.startX, 0);
    this.cx.lineTo(this.graph.startX, this.graph.height - this.graph.startY);
    this.cx.stroke();
    this.cx.closePath();

    // Draw x axis line
    this.cx.beginPath();
    this.cx.moveTo(0, Math.abs(this.graph.startY - this.graph.height));
    this.cx.lineTo(this.graph.width,  Math.abs(this.graph.startY - this.graph.height));
    this.cx.stroke();
    this.cx.closePath();

    // Stroke x axis title
    this.cx.strokeText('Month', this.graph.width / 2,  this.graph.height - 10);

    // Draw Y axis labels and lines;
    for (let i = 0; i < this.graph.height; i += this.graph.intervalY ) {
      const y = (this.graph.height - 50) - i;

      const label = Math.ceil((i / (this.graph.height - (this.graph.startY * 2)) * this.graph.max));
      this.cx.strokeText(label.toString(), 10, y);

      // Set strokeStyle for line
      this.cx.strokeStyle = '#9ccdda';

      // Draw line
      this.cx.beginPath();
      this.cx.moveTo(this.graph.startX, y);
      this.cx.lineTo(this.graph.width, y);
      this.cx.stroke();

      // Reset strokeStyle
      this.cx.strokeStyle = 'black';

    }
    // Draw X axis labels & lines
    for (let i = 0; i < this.graph.size(); i++) {
      this.cx.strokeText(this.graph.points[i].title, this.graph.points[i].x, canvasEl.height - 30);
      if (i > 0) {
        // Set strokeStyle for line
        this.cx.strokeStyle = '#9ccdda';

        // Draw line
        this.cx.beginPath();
        this.cx.moveTo(this.graph.points[i].x, Math.abs(this.graph.startY - this.graph.height));
        this.cx.lineTo(this.graph.points[i].x, 0);
        this.cx.stroke();

        // Reset strokeStyle
        this.cx.strokeStyle = 'black';
      }
     }

    // Line styles for actual line
    this.cx.strokeStyle = this.graph.line.color;
    this.cx.lineWidth = this.graph.line.width;
    this.cx.lineCap = 'round';

    // Invert scale
    this.cx.translate(0, canvasEl.height);
    this.cx.scale(1, -1);

    let prev = this.graph.points[0];
    for (let i = 0; i < this.graph.size(); i++) {
      // Draw line
      this.cx.beginPath();
      this.cx.moveTo(prev.x, prev.y);
      this.cx.lineTo(this.graph.points[i].x, this.graph.points[i].y);


      if (this.fill) {
        this.cx.fillStyle = '#41fcff';

        this.cx.lineTo(this.graph.points[i].x, this.graph.startY);
        this.cx.lineTo(prev.x , this.graph.startY);
        this.cx.fill();
      } else {
        this.cx.stroke();
        this.cx.closePath();
      }

      prev = this.graph.points[i];
    }
  }
}
