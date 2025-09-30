import { useEffect, useState } from 'react';
import { GridColumn } from '@lib/components/ui';
import { toRecornNameString } from './utils';
import { Field, Meta, ModelRecord } from '../types';

interface UseModelGridColumnsProps {
  meta?: Meta;
  metaModels?: Meta[];
}

function modelSchemaToGridColumns({
  meta,
  metaModels,
}: UseModelGridColumnsProps) {
  if (!meta) {
    return [];
  }
  return Object.keys(meta.schema).map((fld: string) => {
    let field: Field = meta.schema[fld] as Field;

    let col: GridColumn<ModelRecord> = {
      field: fld,
      headerName: field._ui_?.label || fld,
      filter: field._ui_?.grid_filter,
    };

    col.sortable = field._ui_?.grid_sortable || true;
    col.resizable = field._ui_?.grid_resizable || true;

    if (field._ui_?.grid_width) {
      col.width = field._ui_?.grid_width;
    } else if (field._ui_?.grid_flex) {
      col.flex = field._ui_?.grid_flex;
    }

    switch (field.type) {
      case 'Date':
        if (!col.width || !col.flex) {
          col.width = 100;
        }
        col.cellDataType = 'date';
        col.valueFormatter = ({ value }: { value: any }): string => {
          if (!value) return '';
          try {
            //return new Date(value).toISOString().replace('T00:00:00.000Z', '');
            return new Date(value).toDateString();
          } catch (e) {
            console.log(e);
            return value;
          }
        };
        col.cellEditor = 'agDateCellEditor';
        break;
      case 'Number':
        if (!col.width || !col.flex) {
          col.width = 100;
        }
        col.cellDataType = 'number';
        break;
      case 'Object':
        col.cellEditor = 'agRichSelectCellEditor';
        col.valueFormatter = ({ value }: { value: any }): string => {
          if (!value) return '';
          try {
            return JSON.stringify(value);
          } catch (e) {
            console.log(e);
            return value;
          }
        };
        break;
      case 'String':
        col.cellDataType = 'text';
        if (!col.filter) {
          col.filter = 'agTextColumnFilter';
        }
        if (!col.width || !col.flex) {
          col.width = 120;
        }
        if (field._ui_?.multiline) {
          col.cellEditor = 'agLargeTextCellEditor';
          col.cellEditorPopup = true;
        }
        break;
    }

    if (field._ui_?.grid_filterable && !col.filter) {
      col.filter = 'agTextColumnFilter';
    }

    if (col.filter) {
      col.filterParams = {
        buttons: ['apply', 'clear', 'reset'],
        filterOptions: ['contains', 'startsWith', 'endsWith', 'equals'],
        //suppressAndOrCondition: true,
      };
    }

    if (field.ref) {
      if (!col.width || !col.flex) {
        col.width = 120;
      }
      col.valueFormatter = (params: { value: any }): string => {
        //console.log('---col.valueFormatter',metaModels, field.ref)
        return toRecornNameString({
          value: params.value,
          model: metaModels?.find((m: Meta) => m.name === field.ref!)!,
        });
      };

      /*if (relatedModels && relatedModels[field.ref]) {
              col.cellEditor = 'agRichSelectCellEditor';
              col.cellEditorParams = {
                values: relatedModels[schm.ref].map((rec:ModelRecord) => rec.name), //todo replace with primary att
              };
            */
    }

    /*
        if (field._ui_?.tags?.length) { //todo weak workaround
            col._ui_ = col._ui_ || {};
            col._ui_.tags = field._ui_.tags;
        }
        */
    return col;
  });
}

export function useModelGridColumns({
  meta,
  metaModels,
}: UseModelGridColumnsProps) {
  const [columns, setColumns] = useState<GridColumn<ModelRecord>[]>([]);

  useEffect(() => {
    if (meta) {
      setColumns(modelSchemaToGridColumns({ meta, metaModels }));
    }
  }, [meta, metaModels]);

  return columns;
}

/*
const columns: GridColumn<ModelRecord>[] = useMemo(
    () => [
        {
            field: 'id' as keyof ModelRecord,
            headerName: `${metaModel?.name} ID`,
            sortable: true,
            resizable: true,
            flex: 1,
            filter: 'agTextColumnFilter',
            filterParams: {
                buttons: ['apply', 'clear', 'reset'],
                filterOptions: ['contains', 'startsWith', 'endsWith', 'equals'],
                suppressAndOrCondition: true,
            },
            cellRenderer: (params: ICellRendererParams<ModelRecord>) => {
                if (!params.data) return null;
                const rec = params.data;
                return (
                    <Button
                        variant="link"
                        className="h-auto p-0 font-normal hover:underline text-left"
                        onClick={() => navigate(`/${metaModel?.name}/${rec.id}`)}
                    >
                        {rec[metaModel?.recordName]}
                    </Button>
                );
            },
        },
        {
            field: 'name' as keyof ModelRecord,
            headerName: 'Name',
            sortable: true,
            resizable: true,
            sort: 'asc',
            flex: 2,
            filter: 'agTextColumnFilter',
            filterParams: {
                buttons: ['apply', 'clear', 'reset'],
                filterOptions: ['contains', 'startsWith', 'endsWith', 'equals'],
                suppressAndOrCondition: true,
            },
            cellRenderer: (params: ICellRendererParams<ModelRecord>) => {
                if (!params.data) return null;
                const rec = params.data;
                return (
                    <Button
                        variant="link"
                        className="h-auto p-0 font-normal hover:underline text-left"
                        onClick={() => navigate(`/${metaModel?.name}/${rec.id}`)}
                    >
                        {rec[metaModel?.recordName]}
                    </Button>
                );
            },
        },
        {
            field: 'description' as keyof ModelRecord,
            headerName: 'Description',
            sortable: false,
            resizable: true,
            flex: 2,
            valueFormatter: (params) => params.value || 'N/A',
        },
        {
            field: 'id' as keyof ModelRecord,
            headerName: 'Actions',
            sortable: false,
            resizable: false,
            width: 100,
            pinned: 'right',
            cellRenderer: (params: ICellRendererParams<ModelRecord>) => {
                if (!params.data) return null;
                const rec = params.data;

                return (
                    <RowActions
                        actions={[
                            {
                                icon: EyeOpenIcon,
                                label: 'View Details',
                                onClick: () => navigate(`/${metaModel?.name}/${rec.id}`),
                            },
                            {
                                icon: TrashIcon,
                                label: 'Delete',
                                onClick: () => onDelete(rec),
                                variant: 'destructive',
                            },
                        ]}
                        className="w-full justify-center"
                    />
                );
            },
        },
    ],
    [navigate, onDelete, metaModel]
);
*/
