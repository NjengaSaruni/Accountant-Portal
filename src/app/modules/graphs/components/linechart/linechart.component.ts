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
    const toMoveWith = canvasEl.width / this.graph.size();
    let left =  0;
    let prev = this.graph.points[0];

    // Draw y axis line
    this.cx.beginPath();
    this.cx.moveTo(40, 0);
    this.cx.lineTo(40, this.graph.height);
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


    // Draw Y axis labels
    const interval = this.graph.height / 10;
    for (let i = 0; i < this.graph.height; i += interval ) {
      this.cx.strokeText(i.toString(), 10, (this.graph.height - 50) - i);
    }

    // Draw X axis labels
    for (let i = 0; i < this.graph.size(); i++) {
      this.cx.strokeText(i.toString(), this.graph.points[i].x + 20, canvasEl.height - 30);
    }

    // Line styles for actual line
    this.cx.strokeStyle = this.graph.line.color;
    this.cx.lineWidth = this.graph.line.width;
    this.cx.lineCap = 'round';
    this.cx.strokeStyle = 'blue';
    this.invertScale(canvasEl);
    for (let i = 0; i < this.graph.size(); i++) {
      // Draw line
      this.cx.beginPath();
      this.cx.moveTo(prev.x + 30, prev.y + 50);
      this.cx.lineTo(this.graph.points[i].x + 30, this.graph.points[i].y + 50);
      this.cx.stroke();

      prev = this.graph.points[i];
      left += toMoveWith;
    }
  }

  invertScale(canvasEl: HTMLCanvasElement) {
    this.cx.lineWidth = this.cx.lineWidth === 1 ? this.graph.line.width : 1;
    this.cx.translate(0, canvasEl.height);
    this.cx.scale(1, -1);
  }
}
