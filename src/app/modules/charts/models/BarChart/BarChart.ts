import {Bar} from './Bar';
import {BarChartLine} from './BarChartLine';
import {DataObject} from '../BaseChart/DataObject';
import {BaseChart} from '../BaseChart/BaseChart';

export class BarChart extends BaseChart {
  get startY(): number {
    return this._startY;
  }

  set startY(value: number) {
    this._startY = value;
  }
  get startX(): number {
    return this._startX;
  }

  set startX(value: number) {
    this._startX = value;
  }
  get intervalY(): number {
    return this._intervalY;
  }

  set intervalY(value: number) {
    this._intervalY = value;
  }
  get min(): number {
    return this._min;
  }
  get max(): number {
    return this._max;
  }
  get barPadding(): number {
    return this._barPadding;
  }
  get line(): BarChartLine {
    return this._line;
  }

  set line(value: BarChartLine) {
    this._line = value;
  }

  get velocity(): number {
    return this._velocity;
  }

  set velocity(value: number) {
    this._velocity = value;
  }

  get bars(): Bar[] {
    return this._bars;
  }

  private _bars: Bar[] = [];
  private _velocity = 1;
  private _line = new BarChartLine();
  private _barPadding = 10;
  private _max: number;
  private _min: number;
  private _startX = 50;
  private _startY = 50;
  private _intervalY: number;


  constructor(width?: number, height?: number) {
    super();
    this.width = width; this.height = height;
    this._intervalY = (this.height - (this._startY * 2)) / 10;
    this.velocity = this.height / 50;
  }

  get size(): number {
    return this._bars.length;
  }

  public populate(data: DataObject[]) {
    this._max = BaseChart.getMaxPoint(data);
    this._min = BaseChart.getMinPoint(data);
    this.createBars(data);
    for (const bar of this._bars) {
      bar.width = (this.width - (this.size * this.barPadding * 2) - this._startX) / this.size;
    }
  }


  private createBars(data: DataObject[]) {
    for (const obj of data) {
      const height = ((obj.value / this._max) * (this.height - this.startY * 2));
      const bar: Bar = new Bar(height);
      bar.value = obj.value;
      bar.title = obj.title;
      bar.color = obj.color;
      this._bars.push(bar);
    }
  }

  get(i: number): Bar {
    return this.bars[i];
  }
}

