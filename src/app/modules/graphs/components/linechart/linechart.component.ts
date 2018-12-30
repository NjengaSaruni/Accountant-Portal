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

    this.invertScale(canvasEl);

    this.cx.fillStyle = '#f6f6f6';
    this.cx.fillRect(0, 0, canvasEl.width, canvasEl.height);
    const toMoveWith = canvasEl.width / this.graph.size();
    let left =  0;
    let prev = this.graph.points[0];

    // Line styles
    this.cx.strokeStyle = this.graph.line.color;
    this.cx.lineWidth = this.graph.line.width;
    this.cx.lineCap = 'round';


    for (let i = 0; i < this.graph.size(); i++) {
      // Draw X axis labels
      this.invertScale(canvasEl);
      this.cx.font = '12px Arial';
      this.cx.strokeText(i.toString(), this.graph.points[i].x, canvasEl.height - 10);
      this.invertScale(canvasEl);

      // Draw line
      this.cx.beginPath();
      this.cx.moveTo(prev.x, prev.y);
      this.cx.lineTo(this.graph.points[i].x, this.graph.points[i].y);
      this.cx.stroke();

      prev = this.graph.points[i];
      left += toMoveWith;
    }

    const interval = this.graph.height / 10;
    this.cx.lineWidth = 1;
    this.cx.translate(0, canvasEl.height);
    this.cx.scale(1, -1);

    for (let i = this.graph.height; i >= 0; i -= interval ) {
      // this.invertScale(canvasEl);
      this.cx.strokeText(i.toString(), 10, Math.abs(i - this.graph.height));
      // this.invertScale(canvasEl);
    }
  }

  invertScale(canvasEl: HTMLCanvasElement) {
    this.cx.lineWidth = this.cx.lineWidth === 1 ? this.graph.line.width : 1;
    this.cx.strokeStyle = this.cx.strokeStyle === '#000' ? this.graph.line.color : '#000';
    this.cx.translate(0, canvasEl.height);
    this.cx.scale(1, -1);
  }
}
