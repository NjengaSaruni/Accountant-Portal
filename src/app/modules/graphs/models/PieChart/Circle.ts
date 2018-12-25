export class Circle {
  get diameter(): number {
    return this._diameter;
  }

  set diameter(value: number) {
    this._diameter = value;
  }
  get radius(): number {
    return this._radius;
  }

  set radius(value: number) {
    this._radius = value;
  }
  private _radius: number;
  private _diameter: number;

  constructor(radius: number) {
    this.radius = radius;
    this.diameter = this.radius * 2;
  }
}
