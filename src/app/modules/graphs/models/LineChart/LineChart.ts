
import {LineChartPoint} from './LineChartPoint';
import {LineChartLine} from './LineChartLine';
import {DataObject} from '../BaseChart/DataObject';
import {BaseChart} from '../BaseChart/BaseChart';

export class LineChart extends BaseChart {
  get startX(): number {
    return this._startX;
  }
  get startY(): number {
    return this._startY;
  }
  get intervalY() {
    return this._intervalY;
  }

  get intervalX(): number {
    return this._intervalX;
  }
  get line(): LineChartLine {
    return this._line;
  }

  set line(value: LineChartLine) {
    this._line = value;
  }

  get max(): number {
    return this._max;
  }

  get points(): LineChartPoint[] {
    return this._points;
  }

  private _points: LineChartPoint[] = [];
  private _intervalX = 10;
  private _intervalY;
  private _max = -Infinity;
  private _min = Infinity;
  private _line: LineChartLine;
  private _startX = 50;
  private _startY = 50;

  constructor(width: number, height: number) {
    super();
    this.width = width; this.height = height;
    this._intervalY = (this.height - (2 * this._startY)) / 10;
    this._line = new LineChartLine();
  }

  public size() {
    return this._points.length;
  }

  public populate(data: DataObject[]) {
    this._max = BaseChart.getMaxPoint(data);
    this._min = BaseChart.getMinPoint(data);
    this._intervalX = (this.width - this._startX) / data.length;
    this.createPoints(data);
  }

  private createPoints(data: DataObject[]) {
    for (let i = 0; i < data.length; i++) {
      const point = new LineChartPoint(data[i].value);
      point.y = ((point.value / this._max) * (this._intervalY * 10)) + this._startY;
      point.x = (i * this._intervalX) + this._startX;
      point.title = data[i].title;
      this._points.push(point);
    }
  }
}
