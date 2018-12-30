import {BaseChart} from '../BaseChart';
import {LineChartPointDataObject} from './LineChartPointDataObject';
import {LineChartPoint} from './LineChartPoint';
import {LineChartLine} from './LineChartLine';

export class LineChart extends BaseChart {
  get line(): LineChartLine {
    return this._line;
  }

  set line(value: LineChartLine) {
    this._line = value;
  }

  get max(): number {
    return this._max;
  }
  get interval(): number {
    return this._interval;
  }

  set interval(value: number) {
    this._interval = value;
  }
  get points(): LineChartPoint[] {
    return this._points;
  }
  set points(value: LineChartPoint[]) {
    this._points = value;
  }
  private _points: LineChartPoint[] = [];
  private _interval = 10;
  private _max = -Infinity;
  private _min = Infinity;
  private _line: LineChartLine;

  constructor(width: number, height: number) {
    super();
    this.width = width; this.height = height;
    this._line = new LineChartLine();
  }

  private static getMinPoint(data: LineChartPointDataObject[]): number {
    return data.reduce((min, p) => p.value < min ? p.value : min, data[0].value);
  }
  private static getMaxPoint(data: LineChartPointDataObject[]): number {
    return data.reduce((max, p) => p.value > max ? p.value : max, data[0].value);
  }

  public size() {
    return this._points.length;
  }

  public populate(data: LineChartPointDataObject[]) {
    this._max = LineChart.getMaxPoint(data);
    this._min = LineChart.getMinPoint(data);
    this._interval = (this.width - 20) / data.length;
    this.createPoints(data);
  }

  private createPoints(data: LineChartPointDataObject[]) {
    for (let i = 0; i < data.length; i++) {
      const point = new LineChartPoint(data[i].value);
      point.y = (point.value / this._max) * this.height - 30;
      point.x = (i * this._interval) + 20;
      this._points.push(point);
    }
  }
}
