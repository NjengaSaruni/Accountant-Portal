import {Bar} from './Bar';
import {BarGraphLine} from './BarGraphLine';
import {DataObject} from '../BaseChart/DataObject';
import {BaseChart} from '../BaseChart/BaseChart';
import {LineChartLine} from '../LineChart/LineChartLine';

export class BarGraph extends BaseChart {
  get min(): number {
    return this._min;
  }
  get max(): number {
    return this._max;
  }
  get barPadding(): number {
    return this._barPadding;
  }
  get line(): BarGraphLine {
    return this._line;
  }

  set line(value: BarGraphLine) {
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
  private _line = new BarGraphLine();
  private _barPadding = 10;
  private _max: number;
  private _min: number;

  constructor(width?: number, height?: number) {
    super();
    this.width = width; this.height = height;
  }

  get size(): number {
    return this._bars.length;
  }

  public populate(data: DataObject[]) {
    this._max = BaseChart.getMaxPoint(data);
    this._min = BaseChart.getMinPoint(data);
    for (const obj of data) {
      const height = ( obj.value / this._max ) * this.height;
      const bar: Bar = new Bar(height);
      bar.title = obj.title;
      this.add(bar);
    }
    for (const bar of this._bars) {
      bar.width = (this.width - (this.size * this.barPadding * 2)) / this.size;
    }
  }


  add(bar: Bar) {
    this._bars.push(bar);
    if (bar.height + 30 > this.height) {
      this.height = bar.height + 30;
    }

    this.velocity = this.height / 50;
  }

  get(i: number): Bar {
    return this.bars[i];
  }
}

