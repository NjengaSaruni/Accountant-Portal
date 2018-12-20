import {BaseChart} from '../BaseChart';
import {Circle} from './Circle';
import {Pie} from './Pie';
import {PieDataObject} from './PieDataObject';

import * as _ from 'lodash';

export class PieChart extends BaseChart {
  get total(): number {
    return this._total;
  }
  get pies(): Pie[] {
    return this._pies;
  }
  get padding(): number {
    return this._padding;
  }

  set padding(value: number) {
    this._padding = value;
    this.configure();
  }
  get outerCircle(): Circle {
    return this._outerCircle;
  }

  set outerCircle(value: Circle) {
    this._outerCircle = value;
    this.configure();
  }
  private _outerCircle: Circle;
  private _padding = 0;
  private _pies: Pie[] = [];
  private _total = 0;

  public addSector(obj: PieDataObject) {
    this._total += obj.value;
    const pie = new Pie(obj.value);
    pie.title = obj.name;
    pie.color = obj.color;
    this.add(pie);
  }

  public populate(data: PieDataObject[]) {
    for (const dataObject of data) {
      this.addSector(dataObject);
    }
  }

  private configure() {
    this.height = this.outerCircle.diameter + this.padding;
    this.width = this.outerCircle.diameter + this.padding;
  }

  add(pie: Pie) {
    this._pies.push(pie);
    this._pies = _.orderBy(this._pies, 'value', 'desc');
    for (const _pie: Pie of this.pies) {
      _pie.angle = (_pie.value / this.total ) * 2 * Math.PI;
    }
  }

  size(): number {
    return this._pies.length;
  }
  constructor(outerRadius: number, innerRadius = 0) {
    super();
    this.outerCircle = new Circle(outerRadius);
  }
}
