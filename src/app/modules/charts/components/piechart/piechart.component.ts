import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {PieChart} from '../../models/PieChart/PieChart';
import {WindowRefService} from '../../../shared/services/window-ref.service';
import {Store} from '@ngrx/store';
import {RootState} from '../../../../core/store/state';
import {TransactionsSelectors} from '../../../dashboard/store';
import {Observable} from 'rxjs';
import {ITransaction, TransactionUtils} from '../../../dashboard/models/Transaction.model';
import {DataObject} from '../../models/BaseChart/DataObject';
import * as moment from 'moment';
import * as _ from 'lodash';

import {getMockPiechart} from '../../../shared/utils/randomInt';
import {println} from '../../../shared/utils/utils';

@Component({
  selector: 'app-piechart',
  templateUrl: './piechart.component.html',
  styleUrls: ['./piechart.component.scss']
})
export class PiechartComponent implements OnInit, AfterViewInit {
  @Input() chart: PieChart;
  transactions$: Observable<ITransaction[]>;
  dataObjects: DataObject[] = [];

  @ViewChild('canvas1') public canvas: ElementRef;
  private cx: CanvasRenderingContext2D;

  constructor(private winRef: WindowRefService,
              private store$: Store<RootState>) { }

  public ngAfterViewInit() {

    this.transactions$ = this.store$.select(
      TransactionsSelectors.selectTransactions
    );

    this.transactions$.subscribe(
      transactions => {
        this.dataObjects = [];

        transactions = transactions.filter(
          transaction => moment(transaction.created_at) >= moment().startOf('month')
          && transaction.amount < 0
        );

        const grouped = _.groupBy(transactions, 'tag.name');
        for (const tag in grouped) {
          this.dataObjects.push(new DataObject(
            tag,
            Math.abs(TransactionUtils.sumOf(grouped[tag])),
            grouped[tag][0].tag.color
          ))
        }

        const newChart = getMockPiechart();
        newChart.populate(this.dataObjects);
        this.chart = newChart;
        this.chart.title = `Expenses for ${moment().format('MMMM')}`;
        this.animateGraph()
      }
    );
  }

  private animateGraph() {
    this.winRef.nativeWindow.requestAnimationFrame(this.animateGraph.bind(this));
    const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
    canvasEl.height = this.chart.height;
    canvasEl.width = this.chart.width;
    this.cx = canvasEl.getContext('2d');
    this.cx.fillStyle = this.chart.backgroundColor;
    this.cx.fill();

    // start at the top
    let currentAngle = -0.5 * Math.PI;
    for (const pie of this.chart.pies) {
      // pie slices
      this.cx.beginPath();
      this.cx.arc(
        this.chart.outerCircle.radius,
        this.chart.outerCircle.radius,
        this.chart.outerCircle.radius,
        currentAngle, currentAngle + pie.rendered_angle
      );
      this.cx.lineTo(this.chart.outerCircle.radius, this.chart.outerCircle.radius);
      this.cx.fillStyle = pie.color;
      this.cx.fill();

      if (pie.rendered_angle < pie.angle) {
        pie.rendered_angle += 0.20;
      } else {
        pie.rendered_angle = pie.angle;
      }

      currentAngle += pie.angle;
    }

    // Inner circle
    this.cx.beginPath();
    this.cx.arc(this.chart.outerCircle.radius, this.chart.outerCircle.radius, this.chart.innerCircle.radius, 0, 2 * Math.PI);
    this.cx.fillStyle = 'white';
    this.cx.fill();

    this.cx.strokeStyle = 'black';
    this.cx.textAlign = 'center';
    this.cx.font = '15px Overpass';
    this.cx.fillStyle = 'black';
    this.cx.fillText('Total' , this.chart.outerCircle.radius, this.chart.outerCircle.radius - 10);
    this.cx.fillText( this.chart.total.toString() + ' KES', this.chart.outerCircle.radius, this.chart.outerCircle.radius + 10);
  }

  ngOnInit() {

  }

  invertColor(color, bw) {
    if (color.indexOf('#') === 0) {
      color = color.slice(1);
    }
    // convert 3-digit color to 6-digits.
    if (color.length === 3) {
      color = color[0] + color[0] + color[1] + color[1] + color[2] + color[2];
    }
    let r = parseInt(color.slice(0, 2), 16);
    let g = parseInt(color.slice(2, 4), 16);
    let b = parseInt(color.slice(4, 6), 16);

    if (color.length !== 6) {
      let rbg_color = color.split('(');
      rbg_color = rbg_color[1].split(',');
      r = parseInt(rbg_color[0], 10);
      g = parseInt(rbg_color[1], 10);
      b = parseInt(rbg_color[2], 10);
    }



    if (bw) {
      return (r * 0.299 + g * 0.587 + b * 0.114) > 186
        ? '#000000'
        : '#FFFFFF';
    }
    // invert color components
    const rstring = (255 - r).toString(16);
    const gstring = (255 - g).toString(16);
    const bstring = (255 - b).toString(16);
    // pad each with zeros and return
    return '#' + this.padZero(rstring) + this.padZero(gstring) + this.padZero(bstring);
  }

  padZero(str, len =  2) {
    const zeros = new Array(len).join('0');
    return (zeros + str).slice(-len);
  }
}
