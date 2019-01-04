export class Message {
  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }
  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }
  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }
  private _id: number;
  private _title: string;
  private _description: string;

  constructor (title: string) {
    this._title = title;
  }
}
