type IVariant =
  | 'outlined'
  | 'plain'
  | 'filled'
  | 'underlined'
  | 'solo'
  | 'solo-inverted'
  | 'solo-filled'
  | undefined;
interface ISelect {
  text: string;
  value: string;
}

export interface IHeaders {
  title?: string;
  align?: string;
  sortable?: boolean;
  width?: string;
  key?: string;
  name?: string;
}

export interface IFilters {
  name?: string;
  model: string;
  label: string;
  type?: string;
  items?: ISelect[];
  placeholder?: string;
  col?: number;
  hint?: string;
  variant?: IVariant;
  disabled?: boolean;
}
// export interface IPagination {
//   totalPages: number;
//   pageSize: number;
//   currentPage: number;
// }
// export interface IAction {
//   title: string;
//   icon: string;
//   cb: (data: object) => void;
// }
// export interface IParams {
//   page?: number;
//   pageSize?: number;
//   search?: string;
//   filters?: string;
//   sortType?: string;
//   sortField?: string;
//   RecycleBin?: boolean;
// }

// export interface ISort {
//   SortType: string;
//   SortField: string;
// }
// export interface IPermissions {
//   name: string;
//   withAdd: boolean;
//   withEdit: boolean;
//   withDelete: boolean;
//   withView: boolean;
//   withApprove: boolean;
//   withLog: boolean;
//   withRestore: boolean;
// }
