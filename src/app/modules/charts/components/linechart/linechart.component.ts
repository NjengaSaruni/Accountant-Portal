import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {LineChart} from '../../models/LineChart/LineChart';
import {ITransaction, TransactionUtils} from '../../../dashboard/models/Transaction.model';
import {DataObject} from '../../models/BaseChart/DataObject';
import * as fromStore from '../../../dashboard/store';
import {Store} from '@ngrx/store';
import {RootState} from '../../../../core/store/state';
import {Observable} from 'rxjs';
import * as moment from 'moment';
import {getMockLinechart} from '../../../shared/utils/randomInt';
import {WindowRefService} from '../../../shared/services/window-ref.service';

@Component({
  selector: 'app-linechart',
  templateUrl: './linechart.component.html',
  styleUrls: ['./linechart.component.scss']
})
export class LinechartComponent implements OnInit {
  @ViewChild('canvas') public canvas: ElementRef;
  @Input() chart: LineChart;
  @Input() fill: boolean;
  private cx: CanvasRenderingContext2D;

  transactions$: Observable<ITransaction[]>;
  dataObjects: DataObject[] = [];
  private mouseX: number;
  mouseY: number;

  constructor(private store$: Store<RootState>,
              private winRef: WindowRefService) { }

  ngOnInit() {

    this.transactions$ = this.store$.select(
      fromStore.selectTransactions
    );

    this.transactions$.subscribe(
      transactions => {
        this.dataObjects = [];
        let count = 11;
        while (count >= 0) {
          const currentMonth = moment().subtract(count, 'months');
          const currentTransactions: ITransaction[] = transactions.filter(
            transaction => moment(transaction.created_at) <= currentMonth.endOf('month')
          );

          const dataObject: DataObject = new DataObject(
            currentMonth.format('MMM'),
            TransactionUtils.sumOf(currentTransactions)
          );

          this.dataObjects.push(dataObject);
          count -= 1;
        }

        const newChart = getMockLinechart(600);
        newChart.populate(this.dataObjects);
        this.chart = newChart;
        this.draw();
      }
    );
  }

  draw() {
    const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
    this.cx = canvasEl.getContext('2d');
    canvasEl.width = this.chart.width;
    canvasEl.height = this.chart.height;

    this.cx.fillStyle = this.chart.backgroundColor;
    this.cx.fillRect(0, 0, canvasEl.width, canvasEl.height);
    this.cx.font = 'normal 10px DejaVu Sans Light, sans-serif';


    // Draw y axis line
    // this.cx.setLineDash([15, 3, 3, 3]);
    this.cx.lineCap = 'round';
    this.cx.lineJoin = 'round';
    this.cx.beginPath();
    this.cx.moveTo(this.chart.startX, 0);
    this.cx.lineTo(this.chart.startX, this.chart.height - this.chart.startY);
    this.cx.stroke();
    this.cx.closePath();

    // Draw x axis line
    this.cx.beginPath();
    this.cx.moveTo(0, Math.abs(this.chart.startY - this.chart.height));
    this.cx.lineTo(this.chart.width,  Math.abs(this.chart.startY - this.chart.height));
    this.cx.stroke();
    this.cx.closePath();

    // Stroke x axis title
    this.cx.strokeText('Month', this.chart.width / 2,  this.chart.height - 10);

    // Draw Y axis labels and lines;
    for (let i = 0; i < this.chart.height; i += this.chart.intervalY ) {
      const y = this.chart.height - this.chart.startY - i;

      let label = Math.ceil((i / (this.chart.height - (this.chart.startY * 2)) * this.chart.max));
      let appendM = false;
      let appendK = false;
      let labelString = label.toString();
      if (label >= 1000000000) {
        appendM = true;
        label /= 1000000000;
        labelString = label.toString() + 'B';
      } else if (label >= 1000000) {
        appendM = true;
        label /= 1000000;
        labelString = label.toString() + 'M';
      } else if (label >= 1000) {
        appendK = true;
        label /= 1000;
        labelString = label.toString() + 'K';
      }

      this.cx.strokeText(labelString, 10, y);

      // Set strokeStyle for line
      this.cx.strokeStyle = '#9ccdda';

      // Draw line
      this.cx.beginPath();
      this.cx.moveTo(this.chart.startX - 5, y);
      this.cx.lineTo(this.chart.width - this.chart.endX + 5, y);
      this.cx.stroke();

      // Reset strokeStyle
      this.cx.strokeStyle = 'black';

    }
    // Draw X axis labels & lines
    for (let i = 0; i < this.chart.size(); i++) {
      this.cx.strokeText(this.chart.points[i].title, this.chart.points[i].x, canvasEl.height - 30);
      if (i > 0) {
        // Set strokeStyle for line
        this.cx.strokeStyle = '#9ccdda';

        if (this.chart.points[i].title === 'Jan') {
          this.cx.strokeStyle = '#1eda1f';
        }

        // Draw line
        this.cx.beginPath();
        this.cx.moveTo(this.chart.points[i].x, Math.abs(this.chart.startY - this.chart.height));
        this.cx.lineTo(this.chart.points[i].x, 0);
        this.cx.stroke();

        // Reset strokeStyle
        this.cx.strokeStyle = 'black';
      }
    }

    // Line styles for actual line
    this.cx.strokeStyle = this.chart.line.color;
    this.cx.lineWidth = this.chart.line.width;
    this.cx.lineCap = 'round';

    // Invert scale
    this.cx.translate(0, canvasEl.height);
    this.cx.scale(1, -1);
    let prev = this.chart.points[0];
    for (let i = 0; i < this.chart.size(); i++) {
      // Draw line
      this.cx.beginPath();
      this.cx.moveTo(prev.x, prev.y);
      this.cx.quadraticCurveTo(prev.x, prev.y, this.chart.points[i].x, this.chart.points[i].y);

      if (this.fill) {
        this.cx.fillStyle = '#41fcff';

        this.cx.lineTo(this.chart.points[i].x, this.chart.startY);
        this.cx.lineTo(prev.x, this.chart.startY);
        this.cx.fill();
      } else {
        this.cx.stroke();
        this.cx.closePath();
      }

      prev = this.chart.points[i];
    }

    if (this.mouseX && this.mouseY) {
      try {
        const point = this.chart.points.filter(
          p => p.x > this.mouseX
        )[0];

        this.cx.lineWidth = 1;
        this.cx.strokeStyle = '#3859da';
        this.cx.strokeRect(point.x, point.y, 100, 50);
        this.cx.fillRect(point.x, point.y, 100, 50);
        this.cx.arc(point.x, point.y, 5, 0, 2 * Math.PI);
        this.cx.fill();
        // Invert scale
        this.cx.translate(0, canvasEl.height);
        this.cx.scale(1, -1);
        this.cx.strokeText(point.title, point.x + 10, this.canvas.nativeElement.height - point.y - 35);
        this.cx.strokeText(point.value.toString() + ' Kshs', point.x + 10, this.canvas.nativeElement.height - point.y - 15);

      } catch (e) {}
    }

    // this.winRef.nativeWindow.requestAnimationFrame(this.draw.bind(this));

  }

  mouseEvent = (event: MouseEvent) => {
    this.mouseX  = this.windowToCanvas(event).x;
    this.mouseY = this.windowToCanvas(event).y;
  };

  windowToCanvas(event: MouseEvent) {
    const bbox = this.canvas.nativeElement.getBoundingClientRect();
    const x = event.clientX;
    const y = event.clientY;

    return { x: x - bbox.left * (this.canvas.nativeElement.width  / bbox.width),
      y: y - bbox.top  * (this.canvas.nativeElement.height / bbox.height)
    };
  }
}
