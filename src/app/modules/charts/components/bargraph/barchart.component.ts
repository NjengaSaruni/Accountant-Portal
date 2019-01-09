import {AfterViewInit, Component, ElementRef, Input, ViewChild} from '@angular/core';
import {fromEvent} from 'rxjs';
import {pairwise, switchMap, takeUntil} from 'rxjs/operators';
import {BarChart} from '../../models/BarChart/BarChart';
import {WindowRefService} from '../../../shared/services/window-ref.service';
import {ColorService} from '../../../shared/services/color.service';
import {Bar} from '../../models/BarChart/Bar';

@Component({
  selector: 'app-barchart',
  templateUrl: './barchart.component.html',
  styleUrls: ['./barchart.component.scss']
})
export class BarchartComponent implements AfterViewInit {

  @ViewChild('canvas2') public canvas: ElementRef;
  @Input() chart: BarChart;

  private cx: CanvasRenderingContext2D;

  constructor(private winRef: WindowRefService) {}

  public ngAfterViewInit() {
    const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
    this.cx = canvasEl.getContext('2d');

    canvasEl.width = this.chart.width;
    canvasEl.height = this.chart.height;

    // Place the background color
    this.cx.fillStyle = this.chart.backgroundColor;
    this.cx.fillRect(0, 0, this.chart.width, this.chart.height);
    this.cx.font = 'normal 12px DejaVu Sans Light, sans-serif';


    // Draw y axis line
    this.cx.beginPath();
    this.cx.moveTo(this.chart.startX, 0);
    this.cx.lineTo(this.chart.startX, this.chart.height - this.chart.startY);
    this.cx.stroke();
    this.cx.closePath();


    // Draw x axis line
    this.cx.beginPath();
    this.cx.moveTo(10, Math.abs(this.chart.startY - this.chart.height));
    this.cx.lineTo(this.chart.width,  Math.abs(this.chart.startY - this.chart.height));
    this.cx.stroke();
    this.cx.closePath();

    // Stroke x axis title
    this.cx.fillStyle = '#000000';
    this.cx.fillText('Month', this.chart.width / 2,  this.chart.height - 10);

    // Configure the dashed lines
    this.cx.setLineDash(this.chart.line.pattern);
    this.cx.lineWidth = this.chart.line.width;
    this.cx.strokeStyle = this.chart.line.color;

    // Draw Y axis labels and lines
    for (let i = 0; i <= this.chart.height; i += this.chart.intervalY ) {
      const y = this.chart.height - this.chart.startY - i;
      const label = Math.ceil((i / (this.chart.intervalY * 10) * this.chart.max));

      this.cx.fillText(label.toString(), 15, y - 2);
      this.cx.beginPath();
      this.cx.moveTo(this.chart.startX - 5, y);
      this.cx.lineTo(this.chart.width, y );
      this.cx.stroke();
    }

    this.cx.textAlign = 'center';
    // Draw X axis labels
    for (let i = 0; i < this.chart.size; i++) {
      const totalBarWidth = this.chart.bars[i].width + 2 * this.chart.barPadding;
      this.cx.fillText(
        this.chart.bars[i].title,
         this.chart.startX + i * totalBarWidth + this.chart.bars[i].width / 2 + this.chart.barPadding,
        canvasEl.height - 30
      );
    }

    this.animateGraph();

    // this.captureEvents(canvasEl);
  }

  private animateGraph() {
    // Animate transition from height 0 to height of bar
    this.winRef.nativeWindow.requestAnimationFrame(this.animateGraph.bind(this));

    let x = this.chart.barPadding;
    for (const bar of this.chart.bars) {
      // Use the bar's set color for the actual bar
      this.cx.fillStyle = bar.color;
      this.cx.fillRect(this.chart.startX + x, this.chart.height - this.chart.startY, bar.width, - bar.currentHeight);
      if (bar.currentHeight <= bar.height) {
        if (bar.currentHeight + this.chart.velocity < bar.height) {
          bar.currentHeight += this.chart.velocity;
        } else {
          bar.currentHeight = bar.height;
        }
      }
      x += bar.width + 2 * this.chart.barPadding;
    }

  }
  private captureEvents(canvasEl: HTMLCanvasElement) {
    // this will capture all mousedown events from the canvas element
    fromEvent(canvasEl, 'mousedown')
      .pipe(
        switchMap((e) => {
          // after a mouse down, we'll record all mouse moves
          return fromEvent(canvasEl, 'mousemove')
            .pipe(
              // we'll stop (and unsubscribe) once the user releases the mouse
              // this will trigger a 'mouseup' event
              takeUntil(fromEvent(canvasEl, 'mouseup')),
              // we'll also stop (and unsubscribe) once the mouse leaves the canvas (mouseleave event)
              takeUntil(fromEvent(canvasEl, 'mouseleave')),
              // pairwise lets us get the previous value to draw a line from
              // the previous point to the current point
              pairwise()
            );
        })
      )
      .subscribe((res: [MouseEvent, MouseEvent]) => {
        const rect = canvasEl.getBoundingClientRect();

        // previous and current position with the offset
        const prevPos = {
          x: res[0].clientX - rect.left,
          y: res[0].clientY - rect.top
        };

        const currentPos = {
          x: res[1].clientX - rect.left,
          y: res[1].clientY - rect.top
        };

        // this method we'll implement soon to do the actual drawing
        this.drawOnCanvas(prevPos, currentPos);
      });
  }

  private drawOnCanvas(prevPos: { x: number, y: number }, currentPos: { x: number, y: number }) {
    if (!this.cx) { return; }

    this.cx.beginPath();

    if (prevPos) {
      this.cx.moveTo(prevPos.x, prevPos.y); // from
      this.cx.lineTo(currentPos.x, currentPos.y);
      this.cx.stroke();
    }
  }
}
