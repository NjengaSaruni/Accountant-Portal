export interface IReportCardTitle {
  name: string;
  color: string;
}
export interface IReportCardBackground {
  color: string;
  url: string;
}
export interface IReportCard {
  title: IReportCardTitle;
  background: IReportCardBackground;
  width: number;
  height: number;
}
