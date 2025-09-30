import { RowModelType } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import React, { useRef, useState } from 'react';
import { Label } from '@lib/components/ui';
import { useMeta } from '../meta';
import { findPageRecords } from '../models/services';
import { setRecordsRelatedModels } from '../models/store';
import { FormFieldBaseProps, Meta } from '../types';
import { Details } from '../ui';
import { toSpaceCase } from '../utils';

interface RelatedModelGridProps extends FormFieldBaseProps {
  value?: any[];
  onChange: (value: any) => void;
  many: boolean;
  model: Meta;
  fields: string[];
  collapsible?: boolean;
}

export function RelatedModelGrid({
  value = [],
  label,
  onChange,
  many,
  model,
  fields,
  className,
  collapsible = true,
}: RelatedModelGridProps): JSX.Element {
  const gridRef = useRef<AgGridReact>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [initPage, setInitPage] = useState<boolean>(false);
  const { metaModels } = useMeta();

  const datasource = {
    getRows: async (params: any) => {
      console.log('get related model Rows', params);
      try {
        let { startRow, endRow, sortModel, filterModel } = params.request;
        let response = await findPageRecords(
          model.name,
          {},
          { startRow, endRow, sortModel, filterModel }
        );
        await setRecordsRelatedModels({
          meta: model.name,
          metaModels: metaModels,
          records: response.records,
        });
        console.log('---response', response);
        if (response) {
          params.success({
            rowData: response.records,
            rowCount: response.count.filtered,
          });
        }
        if (gridRef.current?.api && !initPage) {
          let ctx = {
            selectAll: value.length > 0 ? value[0] === '*' : false,
            toggledNodes: value.length > 0 ? value : [],
          };
          gridRef.current.api.setServerSideSelectionState(ctx);
          setInitPage(true);
        }
      } catch (error) {
        console.log('error', error);
        params.fail();
      }
    },
  };

  if (!many) {
    throw new Error('many is required');
  }

  const handleOpen = () => {
    setInitPage(false); //todo: revisit this shouldn't be needed
    setOpen(true);
  };

  let columnDefs: any[] = [];
  if (fields.length < 1) {
    columnDefs.push({
      field: model.recordName || 'id',
      filter: 'agTextColumnFilter',
      headerName: toSpaceCase(model.recordName || 'id'),
      flex: 1,
    });
  }

  fields.forEach((col) => {
    columnDefs.push({
      field: col,
      filter: 'agTextColumnFilter', //todo: add other filter type
      headerName: toSpaceCase(col),
      flex: 1,
    });
  });

  const props = {
    animateRows: false,
    ref: gridRef,
    rowModelType: 'serverSide' as RowModelType,
    serverSideDatasource: datasource,
    maxConcurrentDatasourceRequests: 1,
    pagination: true,
    paginationPageSize: 25,
    getRowId: ({ data }: { data: any }) => data.id || data._id || data.Id,
    paginationPageSizeSelector: [25, 50, 100],
    columnDefs,
    selectionColumnDef: {
      width: 30,
    },
    rowSelection: {
      mode: 'multiRow' as const,
    },
    onSelectionChanged: (event: any) => {
      let selectedRows = event.api.getServerSideSelectionState();
      if (selectedRows.selectAll) {
        onChange('*');
      } else {
        console.log('selectedRows', selectedRows);
        onChange(selectedRows.toggledNodes);
      }
    },
  };

  if (collapsible) {
    return (
      <div className={className}>
        <Details
          className="my-2"
          open={open}
          onShow={handleOpen}
          onHide={() => setOpen(false)}
          summary={label || model.name}
        >
          {open && (
            <div
              style={{ height: '400px', overflow: 'auto' }}
              className={`grid-${model.name} grid`}
            >
              <AgGridReact {...props} />
            </div>
          )}
        </Details>
      </div>
    );
  }

  return (
    <div className={className}>
      {label && <Label className="m-2">{label}</Label>}
      <div
        style={{ height: '400px', overflow: 'auto' }}
        className={`grid-${model.name} grid`}
      >
        <AgGridReact {...props} />
      </div>
    </div>
  );
}
