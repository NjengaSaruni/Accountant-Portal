import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-piechart',
  templateUrl: './piechart.component.html',
  styleUrls: ['./piechart.component.scss']
})
export class PiechartComponent implements OnInit, AfterViewInit {
  @Input() max: number;
  @ViewChild('canvas') public canvas: ElementRef;
  private cx: CanvasRenderingContext2D;

  constructor(
  ) { }

  public ngAfterViewInit() {
    const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
    this.cx = canvasEl.getContext('2d');

    const results = [
      {name: 'Satisfied', count: 1043, color: 'lightblue'},
      {name: 'Neutral', count: 563, color: 'lightgreen'},
      {name: 'Unsatisfied', count: 510, color: 'pink'},
      {name: 'No comment', count: 175, color: 'silver'}
    ];
    const total = results.reduce(function (sum, choice) {
      return sum + choice.count;
    }, 0);

    // start at the top
    let currentAngle = -0.5 * Math.PI;
    const centerX = 75, centerY = 75;

    for (const result of results) {
      const sliceAngle = (result.count / total) * 2 * Math.PI;
      const middleAngle = currentAngle + 0.5 * sliceAngle;

      // pie slices
      this.cx.beginPath();
      this.cx.arc(centerX, centerY, 75, currentAngle, currentAngle + sliceAngle);
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
  }

  ngOnInit() {

  }

}
