import {AfterViewInit, Component, ElementRef, Input, ViewChild} from '@angular/core';
import {fromEvent} from 'rxjs';
import {pairwise, switchMap, takeUntil} from 'rxjs/operators';
import {BarGraph} from '../../../../shared/models/BarGraph';
import {randomInt} from '../../../../shared/utils/randomInt';
import {Color} from '../../../../shared/models/Color';
import {WindowRefService} from '../../../../shared/services/window-ref.service';

@Component({
  selector: 'app-bargraph',
  templateUrl: './bargraph.component.html',
  styleUrls: ['./bargraph.component.scss']
})
export class BargraphComponent implements AfterViewInit {

  @ViewChild('canvas') public canvas: ElementRef;
  @Input() graph: BarGraph;
  @Input() max: number;
  @Input() barWidth: number;

  @Input() public width = 400;
  @Input() public height = 400;

  private cx: CanvasRenderingContext2D;
  private value = 0;
  private colors: Color[] = [];

  constructor(private winRef: WindowRefService) {}
  public ngAfterViewInit() {
    this.colors.push(new Color(255, 71, 71));
    this.colors.push(new Color(0, 206, 237));
    this.colors.push(new Color(255, 255, 71));
    const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
    this.cx = canvasEl.getContext('2d');

    canvasEl.width = this.width;
    canvasEl.height = this.height;

    this.cx.lineWidth = 3;
    this.cx.lineCap = 'round';
    this.cx.strokeStyle = '#1cbcff';

    let i = 0;
    this.animateGraph();

    this.cx.beginPath();
    this.cx.moveTo(20, 600 - this.graph.bars[0].height);
    i = 1;
    while (i < this.graph.bars.length) {
      this.cx.lineTo(i * 50 + 55, 600 - this.graph.bars[i].height);
      i++;
    }

    this.cx.stroke();

    // this.captureEvents(canvasEl);
  }

  private animateGraph() {
    this.winRef.nativeWindow.requestAnimationFrame(this.animateGraph.bind(this));
    this.cx.clearRect(0, 0, this.width, this.height);

    for (let i = 0; i < this.graph.bars.length; i++) {
      this.cx.fillStyle = `rgba(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)},0.9)`;
      this.cx.fillRect(i * 50 + 5, 600, 40, -this.graph.bars[i].currentHeight);

      if (this.graph.bars[i].currentHeight < this.graph.bars[i].height) {
        this.graph.bars[i].currentHeight += 5;
      }
      // console.log(this.graph.bars[i].currentHeight);
      // if (i === 0) { break; }
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
