import type { GridReadyEvent } from 'ag-grid-community';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { GridViewDto, GridApiWithColumnState } from '@lib/types';

/**
 * Hook to apply a shared grid view (column state + filter model) when AG Grid is ready
 * and whenever the shared view changes.
 */
export function useSharedGridView<TData = any>(sharedView?: GridViewDto) {
  const gridApisRef = useRef<{ api: GridApiWithColumnState | null }>({
    api: null,
  });
  const [gridApiReady, setGridApiReady] = useState<boolean>(false);

  const applySharedViewToApi = useCallback(
    (api: GridApiWithColumnState) => {
      if (!sharedView) return;
      if (sharedView.columnState && Array.isArray(sharedView.columnState)) {
        api.applyColumnState({
          state: sharedView.columnState,
          applyOrder: true,
        });
        api.onSortChanged();
      }
      if (sharedView.filterModel) {
        api.setFilterModel(sharedView.filterModel);
        api.onFilterChanged();
      }
    },
    [sharedView]
  );

  const onGridReady = useCallback(
    (e: GridReadyEvent<TData>) => {
      gridApisRef.current.api = e.api as GridApiWithColumnState;
      setGridApiReady(true);
      if (sharedView) {
        applySharedViewToApi(e.api as GridApiWithColumnState);
      }
    },
    [applySharedViewToApi, sharedView]
  );

  useEffect(() => {
    const api = gridApisRef.current.api;
    if (!api || !gridApiReady || !sharedView) return;
    applySharedViewToApi(api);
  }, [gridApiReady, sharedView, applySharedViewToApi]);

  return { gridApisRef, gridApiReady, onGridReady };
}
