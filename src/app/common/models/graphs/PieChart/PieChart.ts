import {BaseChart} from '../BaseChart';
import {Circle} from './Circle';
import {Pie} from './Pie';
import {PieDataObject} from './PieDataObject';


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
  private _padding = 20;
  private _pies: Pie[] = [];
  private _total = 0;

  private addSector(obj: PieDataObject) {
    this._total += obj.value;
    const pie = new Pie((obj.value / this.total) * 2 * Math.PI);
    pie.title = obj.name;
    pie.color = obj.color;
    this.add(pie);
  }
  private configure() {
    this.height = this.outerCircle.diameter + this.padding;
    this.width = this.outerCircle.diameter + this.padding;
  }
  add(pie: Pie) {
    this._pies.push(pie);
  }

  size(): number {
    return this._pies.length;
  }
  constructor(outerRadius: number, innerRadius = 0) {
    super();
    this.outerCircle = new Circle(outerRadius);
  }
}
