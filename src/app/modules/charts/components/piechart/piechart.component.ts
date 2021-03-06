import {AfterViewInit, Component, ElementRef, Input, NgZone, OnInit, ViewChild} from '@angular/core';
import {PieChart} from '../../models/PieChart/PieChart';
import {WindowRefService} from '../../../shared/services/window-ref.service';
import {Store} from '@ngrx/store';
import {RootState} from '../../../../core/store/state';
import * as fromStore from '../../../dashboard/store';
import {Observable} from 'rxjs';
import {ITransaction, TransactionUtils} from '../../../dashboard/models/Transaction.model';
import {DataObject} from '../../models/BaseChart/DataObject';
import * as moment from 'moment';
import * as _ from 'lodash';
import {invertColor} from '../../../shared/utils/colors.utils';

@Component({
  selector: 'app-piechart',
  templateUrl: './piechart.component.html',
  styleUrls: ['./piechart.component.scss']
})
export class PiechartComponent implements AfterViewInit {
  @Input() chart: PieChart;
  transactions$: Observable<ITransaction[]>;
  dataObjects: DataObject[] = [];
  unselectedTags: string[] = [];

  @ViewChild('canvas1') public canvas: ElementRef;
  private cx: CanvasRenderingContext2D;

  constructor(private winRef: WindowRefService,
              private ngZone: NgZone,
              private store$: Store<RootState>) {
  }

  public ngAfterViewInit() {

    this.transactions$ = this.store$.select(
      fromStore.selectTransactions
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

        const newChart = new PieChart(150, 120);
        newChart.populate(this.dataObjects);
        this.chart = newChart;
        this.chart.title = `Expenses for ${moment().format('MMMM')}`;

        this.ngZone.runOutsideAngular(() => {
          requestAnimationFrame(this.animateGraph.bind(this));
        });
      }
    );
  }

  private animateGraph() {
    console.log('Animating');
    const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
    canvasEl.height = 500;
    canvasEl.width = this.chart.width;
    this.cx = canvasEl.getContext('2d');
    // this.cx.fillStyle = this.chart.backgroundColor;
    this.cx.fillStyle = '#000';
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
        currentAngle, pie.angle
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

  invertColor(color, bw) {
    return invertColor(color, bw);
  }

  toggleTag(name: string) {
    const index = this.unselectedTags.indexOf(name);
    if (index !== -1) {
      this.unselectedTags.splice(index, 1);
    } else {
      this.unselectedTags.push(name)
    }

    console.log(this.unselectedTags);
    this.transactions$.subscribe(
      transactions => {
        this.dataObjects = [];

        transactions = transactions.filter(
          transaction => moment(transaction.created_at) >= moment().startOf('month')
            && transaction.amount < 0
        );

        const grouped = _.groupBy(transactions, 'tag.name');
        for (const tag in grouped) {
          if (this.unselectedTags.indexOf(tag) === -1) {
            this.dataObjects.push(new DataObject(
              tag,
              Math.abs(TransactionUtils.sumOf(grouped[tag])),
              grouped[tag][0].tag.color
            ))
          }
        }

        const newChart = new PieChart(150, 120);
        newChart.populate(this.dataObjects);
        this.chart = newChart;
        this.chart.title = `Expenses for ${moment().format('MMMM')}`;
        this.animateGraph()
      }
    );
  }
}
