export enum ECardType {
  Income =  'Income',
  Expense = 'Expense',
  Saved =  'Saved',
  NetWorth = 'Net Worth'
}

export interface IReportCardTitle {
  name: string;
  color: string;
}
export interface IReportCardBackground {
  color: string;
  url: string;
}
export interface IReportCardData {
  value: number;
  unit: string | undefined;
  previous: number | undefined;
  positive: boolean;
}
export interface IReportCard {
  title: IReportCardTitle;
  type: ECardType;
  background: IReportCardBackground;
}
