export interface IAbstractBase {
  id: string;
  created_at: Date;
  updated_at: Date;
  created_by: any;
  updated_by: any;

  // Events
  selected: boolean;
  hovered: boolean;
}
