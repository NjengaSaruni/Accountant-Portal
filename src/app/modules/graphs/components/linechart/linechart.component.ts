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

    canvasEl.width = 900;
    canvasEl.height = 400;

    this.cx.translate(0, canvasEl.height);
    this.cx.scale(1, -1);

    this.cx.fillStyle = '#f6f6f6';
    this.cx.fillRect(0, 0, canvasEl.width, canvasEl.height);
    const data = [40, 65, 72, 120, 250, 87, 100, 42];
    let left =  0;
    let prev = data[0];
    for (let i = 0; i < data.length; i++) {
      this.cx.beginPath();
      this.cx.moveTo(left, prev);
      this.cx.lineTo(left + 100, data[i]);
      this.cx.lineWidth = 5;
      this.cx.lineCap = 'round';

      prev = data[i];
      left += 100;

      this.cx.stroke();
    }

  )

  }

}
