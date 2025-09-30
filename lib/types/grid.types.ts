import type {
    ApplyColumnStateParams,
    GridApi as BaseGridApi,
    ColumnState,
    FilterModel,
} from 'ag-grid-community';

// Extend GridApi to include column state methods
export interface GridApiWithColumnState extends BaseGridApi {
    getColumnState(): ColumnState[];
    applyColumnState(params: ApplyColumnStateParams): boolean;
    getFilterModel(): FilterModel;
    setFilterModel(model: FilterModel | null): void;
    onFilterChanged(): void;
    onSortChanged(): void;
}

// Type for the grid view state
export interface GridViewState {
    filterModel: FilterModel | null;
    columnState: ColumnState[] | null;
    searchText?: string;
}

// Type for the getApis function return
export interface GridApisReturn {
    gridApi: GridApiWithColumnState | null;
    getSearchText?: () => string;
    setSearchText?: (v: string) => void;
}

export interface GridViewDto extends GridViewState {
    id: string;
    name: string;
    userId: string;
    gridKey: string;
    isDefault: boolean;
    isShared: boolean;
    shareToken?: string | null;
    createdAt: string;
    updatedAt: string;
}
