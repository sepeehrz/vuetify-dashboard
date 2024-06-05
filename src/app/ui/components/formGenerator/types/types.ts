type IType = 'TextField';
interface ISelect {
  value: string;
  id: string | number;
}

export interface IRows {
  items?: ISelect[];
  label: string;
  hint?: string;
  model: string;
  placeholder?: string;
  type: IType;
  hide?: boolean;
  name?: string;
  status?: boolean;
  prefix?: string;
  disabled?: boolean;
  typeInput?: string;
  col?: number;
  onChange?: (value: string) => void;
}
export interface IFormData {
  title?: string;
  hide?: boolean;
  rows: IRows[];
}
