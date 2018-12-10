import {AfterViewInit, Component, ElementRef, Input, ViewChild} from '@angular/core';
import {fromEvent} from 'rxjs';
import {pairwise, switchMap, takeUntil} from 'rxjs/operators';
import {Bar, BarGraph} from '../../../../shared/models/BarGraph';
import {WindowRefService} from '../../../../shared/services/window-ref.service';
import {ColorService} from '../../../../shared/services/color.service';

@Component({
  selector: 'app-bargraph',
  templateUrl: './bargraph.component.html',
  styleUrls: ['./bargraph.component.scss']
})
export class BargraphComponent implements AfterViewInit {

  @ViewChild('canvas') public canvas: ElementRef;
  @Input() graph: BarGraph;

  private cx: CanvasRenderingContext2D;

  constructor(private winRef: WindowRefService,
              private colorService: ColorService) {}
  public ngAfterViewInit() {
    const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
    this.cx = canvasEl.getContext('2d');

    canvasEl.width = this.graph.width;
    canvasEl.height = this.graph.height;

    this.animateGraph();

    // this.captureEvents(canvasEl);
  }

  private animateGraph() {
    // Animate transition from height 0 to height of bar
    this.winRef.nativeWindow.requestAnimationFrame(this.animateGraph.bind(this));

    for (let i = 0; i < this.graph.size; i++) {
      const bar: Bar = this.graph.get(i);

      // Use the bar's set color for the actual bar
      this.cx.fillStyle = bar.color;
      this.cx.fillRect(i * bar.width, this.graph.height, bar.width - 10, - bar.currentHeight);
      if (bar.currentHeight < bar.height) {
        bar.currentHeight += 10;
      }
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
