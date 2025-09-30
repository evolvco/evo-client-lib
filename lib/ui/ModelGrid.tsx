import { RowClickedEvent } from 'ag-grid-community';
import { useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Grid as _Grid, ErrorBoundary, GridDataSource } from '@lib/components/ui';
import { cn } from '@ui/utils';
import { useSharedGridView } from '@lib/models';
import { useMeta } from '@lib/meta';
import { FormFieldBaseProps, Meta, ModelRecord, ModelGridProps } from '../types';
import {useModelGridColumns, useModelGridData} from '@lib/models';
import { dispatch } from '@lib/bus';


export function ModelGrid({
  meta,
  where,
  handleEdit,
  className,
  rowClickPath,
  dispatchSelect,
  height,
}: ModelGridProps): JSX.Element {
  const navigate = useNavigate();
  const { metaModels, loadingMetaModels } = useMeta();
  const [searchParams] = useSearchParams();
  const sharedToken = searchParams.get('sharedView') || undefined;

  const { dataSource, isLoading } = useModelGridData({ meta, where });
  const { gridApisRef, onGridReady } = useSharedGridView();
  const [searchTextState, setSearchTextState] = useState<string>('');

  const columns = useModelGridColumns({ meta, metaModels });

  const onDelete = (rec: ModelRecord) => {
    console.log('delete', rec);
  };

  const onRowClick = (data: ModelRecord) => {
    if (rowClickPath) {
      navigate(rowClickPath.replace(':id', data.id));
    }
    if (dispatchSelect) {
      dispatch(dispatchSelect, { value: data });
    }
  };

  return (
    <ErrorBoundary>
      <div className={cn('w-full', className)}>
        <_Grid<ModelRecord>
          columns={columns}
          dataSource={dataSource as unknown as GridDataSource<ModelRecord>}
          height={`${height || 'calc(100vh - 220px)'}`}
          showSideBar
          onRowClicked={onRowClick}
          loading={isLoading}
          gridOptions={{ suppressHorizontalScroll: false }}
          onGridReady={onGridReady}
        />
      </div>
    </ErrorBoundary>
  );
}