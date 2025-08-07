export interface Column {
  field: string;
  headerName?: string;
  editable?: boolean;
  filter?: boolean | string;
  width?: string;
  cellDataType?: string;
  valueFormatter?: (params: { value: any }) => string;
  cellEditor?: string;
  cellEditorPopup?: boolean;
  cellEditorParams?: {
    values: any[];
  };
  _ui_?: {
    tags?: string[];
    grid?: any;
    [key: string]: any;
  };
  [key: string]: any;
}

