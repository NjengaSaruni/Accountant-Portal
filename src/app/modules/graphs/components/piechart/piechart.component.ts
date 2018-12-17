import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-piechart',
  templateUrl: './piechart.component.html',
  styleUrls: ['./piechart.component.scss']
})
export class PiechartComponent implements OnInit, AfterViewInit {
  @Input() height: number;
  @Input() width: number;
  @Input() title: number;

  @ViewChild('canvas') public canvas: ElementRef;
  private cx: CanvasRenderingContext2D;

  constructor(
  ) { }

  public ngAfterViewInit() {
    const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
    canvasEl.height = 500;
    canvasEl.width = 500;
    this.cx = canvasEl.getContext('2d');

    const results = [
      {name: 'Satisfied', count: 1043, color: 'red'},
      {name: 'Neutral', count: 563, color: 'blue'},
      {name: 'Unsatisfied', count: 510, color: 'green'},
      {name: 'No comment', count: 175, color: 'silver'},
   ];
    const total = results.reduce(function (sum, choice) {
      return sum + choice.count;
    }, 0);

    // start at the top
    let currentAngle = -0.5 * Math.PI;
    const centerX = 200, centerY = 200;

    for (const result of results) {
      const sliceAngle = (result.count / total) * 2 * Math.PI;
      const middleAngle = currentAngle + 0.5 * sliceAngle;

      // pie slices
      this.cx.beginPath();
      this.cx.arc(centerX, centerY, 100, currentAngle, currentAngle + sliceAngle);
      currentAngle += sliceAngle;
      this.cx.lineTo(centerX, centerY);
      this.cx.fillStyle = result.color;
      this.cx.fill();

      // labels
      if (middleAngle < -0.5 * Math.PI || middleAngle > 0.5 * Math.PI) {
        this.cx.textAlign = 'right';
      } else {
        this.cx.textAlign = 'left';
      }
      this.cx.textBaseline = 'middle';
      this.cx.fillText(result.name,
        Math.cos(middleAngle) * 120 + centerX,
        Math.sin(middleAngle) * 120 + centerY);
    }

    // pie slices
    this.cx.beginPath();
    this.cx.arc(centerX, centerY, 25, 0, 2 * Math.PI);
    this.cx.fillStyle = 'white';
    this.cx.fill();
  }

  ngOnInit() {

  }

}
