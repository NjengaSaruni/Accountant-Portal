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
  private cx: CanvasRenderingContext2D;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
    this.cx = canvasEl.getContext('2d');

    canvasEl.width = this.graph.width;
    canvasEl.height = this.graph.height;

    this.cx.fillStyle = '#f6f6f6';
    this.cx.fillRect(0, 0, canvasEl.width, canvasEl.height);

    // Draw y axis line
    this.cx.beginPath();
    this.cx.moveTo(40, 0);
    this.cx.lineTo(40, this.graph.height - 10);
    this.cx.stroke();
    this.cx.closePath();

    // Draw x axis line
    this.cx.beginPath();
    this.cx.moveTo(0, Math.abs(50 - this.graph.height));
    this.cx.lineTo(this.graph.width,  Math.abs(50 - this.graph.height));
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
      this.cx.moveTo(10, y);
      this.cx.lineTo(this.graph.width, y);
      this.cx.stroke();

      // Reset strokeStyle
      this.cx.strokeStyle = 'black';

    }
    // Draw X axis labels
    for (let i = 0; i < this.graph.size(); i++) {
      this.cx.strokeText(this.graph.points[i].title, this.graph.points[i].x + 20, canvasEl.height - 30);
    }

    // Line styles for actual line
    this.cx.strokeStyle = this.graph.line.color;
    this.cx.lineWidth = this.graph.line.width;
    this.cx.lineCap = 'round';
    this.cx.strokeStyle = 'blue';

    this.invertScale(canvasEl);
    let prev = this.graph.points[0];
    for (let i = 0; i < this.graph.size(); i++) {
      // Draw line
      this.cx.beginPath();
      this.cx.moveTo(prev.x + 20, prev.y);
      this.cx.lineTo(this.graph.points[i].x + 20, this.graph.points[i].y);
      this.cx.stroke();

      prev = this.graph.points[i];
    }
  }

  invertScale(canvasEl: HTMLCanvasElement) {
    this.cx.lineWidth = this.cx.lineWidth === 1 ? this.graph.line.width : 1;
    this.cx.translate(0, canvasEl.height);
    this.cx.scale(1, -1);
  }
}
