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

    this.cx.translate(0, canvasEl.height);
    this.cx.scale(1, -1);

    this.cx.fillStyle = '#f6f6f6';
    this.cx.fillRect(0, 0, canvasEl.width, canvasEl.height);
    const toMoveWith = canvasEl.width / this.graph.size();
    let left =  0;
    let prev = this.graph.points[0];
    this.cx.strokeStyle = 'red';
    for (let i = 0; i < this.graph.size(); i++) {
      this.cx.beginPath();
      this.cx.moveTo(prev.x, prev.y);
      this.cx.lineTo(this.graph.points[i].x, this.graph.points[i].y);
      // this.cx.lineWidth = 5;
      // this.cx.lineCap = 'round';

      prev = this.graph.points[i];
      left += toMoveWith;

      this.cx.stroke();
    }
  }
}
