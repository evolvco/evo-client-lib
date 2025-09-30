import {
    ColDef,
    ColumnApiModule,
    EventApiModule,
    FilterModel,
    GetRowIdParams,
    GridApi,
    GridOptions,
    GridReadyEvent,
    IDateFilterParams,
    INumberFilterParams,
    IServerSideDatasource,
    IServerSideGetRowsParams,
    ISetFilterParams,
    ITextFilterParams,
    ModuleRegistry,
    RowApiModule,
    RowClickedEvent,
    RowDoubleClickedEvent,
    RowModelType,
    SideBarDef,
    SortModelItem,
    ValidationModule,
  } from 'ag-grid-community';
  // Import required ag-grid enterprise modules
  import 'ag-grid-community/styles/ag-grid.css';
  import 'ag-grid-community/styles/ag-theme-balham.css';
  import {
    ClipboardModule,
    ColumnMenuModule,
    ColumnsToolPanelModule,
    DateFilterModule,
    FiltersToolPanelModule,
    LicenseManager,
    MenuModule,
    NumberFilterModule,
    RowGroupingModule,
    ServerSideRowModelApiModule,
    ServerSideRowModelModule,
    SetFilterModule,
    StatusBarModule,
    TextFilterModule,
  } from 'ag-grid-enterprise';
  import { AgGridReact } from 'ag-grid-react';
  import { Loader2, Search } from 'lucide-react';
  import React, {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
  } from 'react';
  import { cn } from '@ui/utils';
  import { Input } from './input';
  
  LicenseManager.setLicenseKey(
    'Using_this_{AG_Grid}_Enterprise_key_{AG-064753}_in_excess_of_the_licence_granted_is_not_permitted___Please_report_misuse_to_legal@ag-grid.com___For_help_with_changing_this_key_please_contact_info@ag-grid.com___{Farcy_Creative_Solutions}_is_granted_a_{Single_Application}_Developer_License_for_the_application_{Reactor_R3}_only_for_{1}_Front-End_JavaScript_developer___All_Front-End_JavaScript_developers_working_on_{Reactor_R3}_need_to_be_licensed___{Reactor_R3}_has_not_been_granted_a_Deployment_License_Add-on___This_key_works_with_{AG_Grid}_Enterprise_versions_released_before_{6_October_2025}____[v3]_[01]_MTc1OTcwNTIwMDAwMA==352da685239131ec5bb4cd2f8de1a947'
  );
  
  /**
   * Register required AG Grid Enterprise modules.
   * These modules provide advanced functionality like server-side row model,
   * filtering, column management, grouping, and clipboard operations.
   */
  try {
    ModuleRegistry.registerModules([
      ServerSideRowModelModule,
      ServerSideRowModelApiModule,
      SetFilterModule,
      TextFilterModule,
      NumberFilterModule,
      DateFilterModule,
      ColumnsToolPanelModule,
      FiltersToolPanelModule,
      MenuModule,
      ColumnMenuModule,
      RowGroupingModule,
      ClipboardModule,
      StatusBarModule,
      ValidationModule,
      RowApiModule,
      EventApiModule,
      ColumnApiModule,
    ]);
  } catch (error) {
    console.warn('Failed to register AG Grid Enterprise modules:', error);
  }
  
  /**
   * Parameters for grid data requests.
   * These parameters are sent to the API to fetch paginated, sorted, and filtered data.
   */
  export interface GridQueryParams {
    /** Starting row index (0-based) for pagination */
    startRow: number;
  
    /** Ending row index (exclusive) for pagination */
    endRow: number;
  
    /** Array of sort configurations applied by the user */
    sortModel: SortModelItem[];
  
    /** Filter configurations applied by the user (null if no filters) */
    filterModel: FilterModel | null;
  
    /** Global search text entered by the user */
    searchText?: string;
  
    /** Additional context data that may be needed for fetching */
    context?: Record<string, unknown>;
  }
  
  /**
   * Configuration interface for a single column in the Grid component.
   * Extends AG Grid's ColDef with additional type safety and custom properties.
   *
   * @template TData - The type of data objects that will be displayed in the table rows
   *
   * @example
   * ```tsx
   * const columns: GridColumn<User>[] = [
   *   {
   *     field: 'name',
   *     headerName: 'Full Name',
   *     sortable: true,
   *     filter: 'agTextColumnFilter',
   *     filterParams: {
   *       filterOptions: ['contains', 'startsWith', 'endsWith'],
   *       defaultOption: 'contains'
   *     },
   *     resizable: true
   *   },
   *   {
   *     field: 'email',
   *     headerName: 'Email Address',
   *     filter: 'agTextColumnFilter',
   *     enableRowGroup: true
   *   },
   *   {
   *     field: 'age',
   *     headerName: 'Age',
   *     filter: 'agNumberColumnFilter',
   *     filterParams: {
   *       filterOptions: ['equals', 'lessThan', 'greaterThan'],
   *       defaultOption: 'equals'
   *     }
   *   },
   *   {
   *     field: 'department',
   *     headerName: 'Department',
   *     filter: 'agSetColumnFilter',
   *     filterParams: {
   *       values: ['Engineering', 'Sales', 'Marketing'],
   *       suppressSelectAll: false
   *     }
   *   }
   * ];
   * ```
   */
  export interface GridColumn<TData = unknown>
    extends Omit<ColDef<TData>, 'field'> {
    /** The data field name that this column will display. Must be a key of TData */
    field: keyof TData & string;
  
    /** The display name shown in the column header */
    headerName: string;
  
    /** Whether this column can be sorted. Explicitly set to true to enable server-side sorting */
    sortable?: boolean;
  
    /**
     * Filter configuration for this column.
     * - `true`: Uses default AG Grid set filter
     * - `string`: Specifies a custom filter type (e.g., 'agTextColumnFilter', 'agNumberColumnFilter')
     * - `false`: Disables filtering for this column
     */
    filter?: boolean | string;
  
    /** Whether this column can be resized by the user. Defaults to true */
    resizable?: boolean;
  
    /** Whether this column should be hidden by default */
    hide?: boolean;
  
    /** Whether this column can be used for row grouping */
    enableRowGroup?: boolean;
  
    /**
     * Additional parameters for filter configuration when filter is enabled.
     * Type depends on the filter type:
     * - ITextFilterParams for 'agTextColumnFilter'
     * - INumberFilterParams for 'agNumberColumnFilter'
     * - ISetFilterParams for 'agSetColumnFilter' or when filter=true
     * - IDateFilterParams for 'agDateColumnFilter'
     */
    filterParams?:
      | ISetFilterParams
      | ITextFilterParams
      | INumberFilterParams
      | IDateFilterParams;
  }
  
  /**
   * Data source interface for server-side data fetching in Grid component.
   * This interface defines how the table will communicate with your backend API
   * to fetch paginated, sorted, and filtered data.
   *
   * @template TData - The type of data objects that will be returned from the server
   *
   * @example
   * ```tsx
   * const dataSource: GridDataSource<User> = {
   *   getRows: async ({ startRow, endRow, sortModel, filterModel, searchText }) => {
   *     const response = await fetch('/api/users', {
   *       method: 'POST',
   *       headers: { 'Content-Type': 'application/json' },
   *       body: JSON.stringify({
   *         startRow,
   *         endRow,
   *         sortModel,
   *         filterModel,
   *         searchText
   *       })
   *     });
   *
   *     const result = await response.json();
   *     return {
   *       data: result.users,
   *       totalCount: result.total
   *     };
   *   }
   * };
   * ```
   */
  export interface GridDataSource<TData = unknown> {
    /**
     * Function to fetch data from the server with pagination, sorting, and filtering.
     * This function is called whenever the table needs to load data (initial load,
     * pagination, sorting, filtering, or searching).
     *
     * @param params - Parameters for data fetching (GridQueryParams)
     *
     * @returns Promise that resolves to an object containing:
     *   - `data`: Array of data objects for the requested rows
     *   - `totalCount`: Total number of records available on the server (for pagination)
     */
    getRows: (params: GridQueryParams) => Promise<{
      data: TData[];
      totalCount: number;
    }>;
  }
  
  /**
   * Props interface for the Grid component.
   * Provides comprehensive configuration options for creating feature-rich data tables
   * with server-side data loading, filtering, sorting, and user interactions.
   *
   * @template TData - The type of data objects that will be displayed in the table
   *
   * @example
   * ```tsx
   * interface User {
   *   id: string;
   *   name: string;
   *   email: string;
   *   status: 'active' | 'inactive';
   * }
   *
   * const tableProps: GridProps<User> = {
   *   columns: [
   *     { field: 'name', headerName: 'Name', sortable: true, filter: true },
   *     { field: 'email', headerName: 'Email', filter: 'agTextColumnFilter' },
   *     { field: 'status', headerName: 'Status', filter: true }
   *   ],
   *   dataSource: myDataSource,
   *   rowSelection: { mode: 'multiRow', enableClickSelection: true },
   *   showGlobalSearch: true,
   *   onRowClicked: (user) => console.log('Clicked:', user),
   *   onSelectionChanged: (users) => console.log('Selected:', users)
   * };
   * ```
   */
  export interface GridProps<TData = unknown> {
    // Required props
  
    /** Column definitions that specify how data should be displayed and configured */
    columns: GridColumn<TData>[];
  
    /** Data source configuration for fetching data from the server */
    dataSource: GridDataSource<TData>;
  
    // Optional props
  
    /** Height of each row in pixels. Defaults to 36 */
    rowHeight?: number;
  
    /** Additional CSS classes to apply to the table container */
    className?: string;
  
    /** Height of the entire table container. Defaults to '400px' */
    height?: string | number;
  
    /** Optional right-aligned controls rendered in the header row next to search */
    headerRightSlot?: React.ReactNode;
  
    /**
     * Optional custom tool panels to be added to the AG Grid sidebar.
     * Use this to inject React components (e.g., a Views selector) as dedicated panels.
     */
    customToolPanels?: Array<{
      /** Unique ID for the panel (also used as component key) */
      id: string;
      /** Panel label displayed in the sidebar */
      label: string;
      /** AG Grid iconKey, defaults to 'columns' */
      iconKey?: string;
      /** Preferred width for the panel */
      width?: number;
      /** Optional explicit min/max widths */
      minWidth?: number;
      maxWidth?: number;
      /** React component implementing the tool panel */
      component: React.ComponentType<{
        api?: GridApi<unknown>;
        columnApi?: any;
        /** Additional params passed via toolPanelParams */
        [key: string]: unknown;
      }>;
      /** Params passed to the tool panel via toolPanelParams */
      toolPanelParams?: Record<string, unknown>;
    }>;
  
    // Row selection
  
    /**
     * Row selection configuration.
     * - { mode: 'singleRow' }: Allow selection of only one row at a time
     * - { mode: 'multiRow' }: Allow selection of multiple rows
     * - undefined: Disable row selection
     */
    rowSelection?: {
      mode: 'singleRow' | 'multiRow';
      enableClickSelection?: boolean;
    };
  
    /** Callback fired when row selection changes. Receives array of selected row data */
    onSelectionChanged?: (selectedRows: TData[]) => void;
  
    // Row ID
  
    /**
     * Function to generate unique IDs for rows. Used for efficient row updates and selection.
     * If not provided, AG Grid will use object references for row identification.
     */
    getRowId?: (params: GetRowIdParams<TData>) => string;
  
    // Grouping
  
    /** Configuration for the auto-generated group column when row grouping is enabled */
    autoGroupColumnDef?: ColDef;
  
    /**
     * Default expansion level for grouped rows.
     * Note: This is only supported with clientSide row model.
     * For serverSide row model, grouping expansion should be handled on the server.
     * - -1: Expand all groups (default)
     * - 0: Collapse all groups
     * - n: Expand n levels deep
     */
    groupDefaultExpanded?: number;
  
    // Search
  
    /** Whether to show the global search input field. Defaults to true */
    showGlobalSearch?: boolean;
  
    /** Placeholder text for the global search input. Defaults to 'Search across all fields...' */
    searchPlaceholder?: string;
  
    // Side bar
  
    /** Whether to show the sidebar with columns and filters panels. Defaults to true */
    showSideBar?: boolean;
  
    // Loading
  
    /** Whether to show a loading overlay on top of the table */
    loading?: boolean;
  
    // Cache settings
  
    /**
     * Number of rows to fetch in each server request. Defaults to 100.
     * Larger values reduce server requests but use more memory.
     */
    cacheBlockSize?: number;
  
    /**
     * Maximum number of row blocks to keep in memory. Defaults to 10.
     * Older blocks are purged when this limit is exceeded.
     */
    maxBlocksInCache?: number;
  
    // Additional grid options
  
    /** Additional AG Grid options to merge with the default configuration */
    gridOptions?: GridOptions<TData>;
  
    // Callbacks
  
    /** Callback fired when the grid has finished initializing */
    onGridReady?: (params: GridReadyEvent<TData>) => void;
  
    /** Callback fired when a row is clicked. Receives the clicked row's data */
    onRowClicked?: (row: TData) => void;
  
    /** Callback fired when a row is double-clicked. Receives the double-clicked row's data */
    onRowDoubleClicked?: (row: TData) => void;
  }
  
  /**
   * Grid - A comprehensive data table component built on AG Grid Enterprise.
   *
   * Features:
   * - Server-side data loading with pagination, sorting, and filtering
   * - Global search across all columns
   * - Row selection (single or multiple)
   * - Column management and customization
   * - Row grouping and aggregation
   * - Sidebar with columns and filters panels
   * - Infinite scrolling with intelligent caching
   * - Full keyboard navigation and accessibility
   * - Export capabilities (CSV, Excel) via AG Grid Enterprise
   * - Context menus and cell editing support
   *
   * This component is designed for large datasets and provides enterprise-grade
   * table functionality with optimal performance through server-side row model.
   *
   * @template TData - The type of data objects displayed in table rows
   *
   * @param props - Configuration props for the table component
   *
   * @example
   * Basic usage:
   * ```tsx
   * interface User {
   *   id: string;
   *   name: string;
   *   email: string;
   *   status: 'active' | 'inactive';
   * }
   *
   * const columns: GridColumn<User>[] = [
   *   { field: 'name', headerName: 'Full Name', sortable: true, filter: true },
   *   { field: 'email', headerName: 'Email', filter: 'agTextColumnFilter' },
   *   { field: 'status', headerName: 'Status', filter: true }
   * ];
   *
   * const dataSource: GridDataSource<User> = {
   *   getRows: async ({ startRow, endRow, sortModel, filterModel, searchText }) => {
   *     const response = await apiClient.getUsers({
   *       offset: startRow,
   *       limit: endRow - startRow,
   *       sort: sortModel,
   *       filters: filterModel,
   *       search: searchText
   *     });
   *
   *     return {
   *       data: response.users,
   *       totalCount: response.total
   *     };
   *   }
   * };
   *
   * function UserTable() {
   *   const handleRowClick = (user: User) => {
   *     navigate(`/users/${user.id}`);
   *   };
   *
   *   return (
   *     <Grid
   *       columns={columns}
   *       dataSource={dataSource}
   *       rowSelection={{ mode: 'multiRow', enableClickSelection: true }}
   *       onRowClicked={handleRowClick}
   *       height="600px"
   *       showGlobalSearch={true}
   *     />
   *   );
   * }
   * ```
   *
   * @example
   * Advanced usage with grouping and custom grid options:
   * ```tsx
   * <Grid
   *   columns={columns}
   *   dataSource={dataSource}
   *   rowSelection={{ mode: 'singleRow', enableClickSelection: true }}
   *   groupDefaultExpanded={1}
   *   autoGroupColumnDef={{
   *     headerName: 'Department',
   *     minWidth: 250,
   *     cellRenderer: 'agGroupCellRenderer'
   *   }}
   *   gridOptions={{
   *     enableRangeSelection: true,
   *     enableCharts: true,
   *     rowModelType: 'clientSide'  // groupDefaultExpanded requires clientSide row model
   *   }}
   *   onSelectionChanged={(rows) => setSelectedUsers(rows)}
   *   onGridReady={(params) => {
   *     // Save grid API reference for external operations
   *     gridApiRef.current = params.api;
   *   }}
   * />
   * ```
   *
   * @returns React component that renders a feature-rich data table
   */
  export function Grid<TData = unknown>({
    columns,
    dataSource,
    rowHeight = 36,
    className,
    height = '100%',
    rowSelection,
    onSelectionChanged,
    getRowId,
    autoGroupColumnDef,
    groupDefaultExpanded,
    showGlobalSearch = false,
    searchPlaceholder = 'Search across all fields...',
    showSideBar = true,
    loading = false,
    cacheBlockSize = 100,
    maxBlocksInCache = 10,
    gridOptions: additionalGridOptions,
    onGridReady,
    onRowClicked,
    onRowDoubleClicked,
    headerRightSlot,
    customToolPanels,
  }: GridProps<TData>) {
    const gridRef = useRef<AgGridReact<TData>>(null);
    const [gridApi, setGridApi] = useState<GridApi<TData> | null>(null);
    const [searchText, setSearchText] = useState('');
    const [debouncedSearchText, setDebouncedSearchText] = useState('');
  
    /**
     * Debounce search text to avoid excessive API calls.
     * Updates debouncedSearchText 500ms after user stops typing.
     */
    useEffect(() => {
      const timer = setTimeout(() => {
        setDebouncedSearchText(searchText);
      }, 500);
  
      return () => clearTimeout(timer);
    }, [searchText]);
  
    /**
     * Default column configuration applied to all columns.
     * These settings are merged with individual column definitions.
     */
    const defaultColDef = useMemo<ColDef>(
      () => ({
        sortable: true,
        filter: false, // Disabled by default, enabled per column basis
        resizable: true,
        menuTabs: ['filterMenuTab', 'columnsMenuTab', 'generalMenuTab'], // Include filterMenuTab for all columns
        filterParams: {
          buttons: ['apply', 'clear', 'reset', 'cancel'],
          // We don't support multiple conditions per column in our backend
          suppressAndOrCondition: true,
          // Enforce single condition even if AG Grid changes UI defaults
          maxNumConditions: 1,
        },
      }),
      []
    );
  
    /**
     * Process column definitions to apply defaults and normalize configuration.
     * This transforms user-provided column configs into AG Grid-compatible format.
     */
    const processedColumns = useMemo(() => {
      return columns.map((col) => {
        // Determine if filter is enabled for this column
        const hasFilter =
          col.filter === true ||
          (typeof col.filter === 'string' && col.filter.length > 0);
  
        // Detect action-style columns (usually have empty header or named 'Actions')
        const isActionColumn =
          !col.headerName ||
          col.headerName.trim().length === 0 ||
          col.headerName.toLowerCase?.() === 'actions' ||
          (col as unknown as { field?: string }).field === 'actions';
  
        return {
          ...col,
          field: col.field as string,
          sortable: isActionColumn ? false : col.sortable !== false, // Default to true unless explicitly disabled
          filter: isActionColumn
            ? false
            : hasFilter
            ? col.filter === true
              ? 'agSetColumnFilter' // Use set filter as default when filter=true
              : col.filter
            : false,
          resizable: isActionColumn ? false : col.resizable !== false, // Default to true unless explicitly disabled
          // Dynamically set menu tabs based on filter availability
          menuTabs: isActionColumn
            ? []
            : hasFilter
            ? ['filterMenuTab', 'columnsMenuTab', 'generalMenuTab']
            : ['columnsMenuTab', 'generalMenuTab'],
          filterParams: col.filterParams
            ? {
                buttons: ['apply', 'clear', 'reset'],
                suppressAndOrCondition: true,
                maxNumConditions: 1,
                ...col.filterParams,
              }
            : {
                buttons: ['apply', 'clear', 'reset'],
                suppressAndOrCondition: true,
                maxNumConditions: 1,
              },
          // Do not allow actions column to appear in tool panels
          suppressColumnsToolPanel: isActionColumn ? true : undefined,
          suppressFiltersToolPanel: isActionColumn ? true : undefined,
          lockVisible: isActionColumn ? true : undefined,
        } as ColDef<TData>;
      });
    }, [columns]);
  
    /**
     * Configure the sidebar with columns and filters tool panels.
     * Provides user interface for managing column visibility and applying filters.
     * Conditionally includes filters panel only if any column has filters enabled.
     */
    const sideBar = useMemo<SideBarDef | boolean>(() => {
      if (!showSideBar) return false;
  
      // Check if any column has filters enabled
      const hasAnyFilters = columns.some(
        (col) =>
          col.filter === true ||
          (typeof col.filter === 'string' && col.filter.length > 0)
      );
  
      const toolPanels: Array<{
        id: string;
        labelDefault: string;
        labelKey: string;
        iconKey: string;
        toolPanel: string;
        minWidth: number;
        width: number;
        maxWidth: number;
        toolPanelParams?: Record<string, unknown>;
      }> = [
        {
          id: 'columns',
          labelDefault: 'Columns',
          labelKey: 'columns',
          iconKey: 'columns',
          toolPanel: 'agColumnsToolPanel',
          minWidth: 225,
          width: 225,
          maxWidth: 225,
        },
      ];
  
      // Only include filters panel if any column has filters
      if (hasAnyFilters) {
        toolPanels.push({
          id: 'filters',
          labelDefault: 'Filters',
          labelKey: 'filters',
          iconKey: 'filter',
          toolPanel: 'agFiltersToolPanel',
          minWidth: 180,
          width: 180,
          maxWidth: 180,
        });
      }
  
      // Append any custom panels provided by the consumer
      if (customToolPanels && customToolPanels.length > 0) {
        for (const panel of customToolPanels) {
          toolPanels.push({
            id: panel.id,
            labelDefault: panel.label,
            labelKey: panel.label.toLowerCase?.() || panel.id,
            iconKey: panel.iconKey ?? 'columns',
            toolPanel: panel.id,
            minWidth: panel.minWidth ?? panel.width ?? 225,
            width: panel.width ?? panel.minWidth ?? 225,
            maxWidth: panel.maxWidth ?? panel.width ?? 225,
            toolPanelParams: panel.toolPanelParams,
          });
        }
      }
  
      return {
        toolPanels,
        position: 'right',
        defaultToolPanel: '', // No default panel selected
      };
    }, [showSideBar, columns, customToolPanels]);
  
    /**
     * Configure the server-side datasource that handles data fetching.
     * This connects the AG Grid server-side row model with the user-provided data source.
     * Automatically handles pagination, sorting, filtering, and search functionality.
     */
    const serverSideDatasource = useMemo<IServerSideDatasource>(
      () => ({
        getRows: async (params: IServerSideGetRowsParams) => {
          try {
            const result = await dataSource.getRows({
              startRow: params.request.startRow ?? 0,
              endRow: params.request.endRow ?? 100,
              sortModel: params.request.sortModel,
              filterModel: params.request.filterModel,
              context: params.context,
              searchText: debouncedSearchText, // Pass debounced search text for server-side filtering
            });
  
            // Notify AG Grid of successful data fetch
            params.success({
              rowData: result.data,
              rowCount: result.totalCount,
            });
          } catch (error) {
            console.error('Error fetching data:', error);
            // Notify AG Grid of failed data fetch
            params.fail();
          }
        },
      }),
      [dataSource, debouncedSearchText]
    );
  
    /**
     * Handle grid initialization and setup.
     * Called when AG Grid has finished loading and is ready to use.
     */
    const handleGridReady = useCallback(
      (params: GridReadyEvent<TData>) => {
        const api = params.api;
        setGridApi(api);
  
        // Set datasource using updateGridOptions (setGridOption is deprecated)
        api.updateGridOptions({
          serverSideDatasource: serverSideDatasource,
        });
  
        // Call user's onGridReady callback if provided
        onGridReady?.(params);
      },
      [serverSideDatasource, onGridReady]
    );
  
    /**
     * Handle global search functionality.
     * When debounced search text changes, update the datasource with the new search text and refresh data.
     * Note: We use debounced search text to avoid excessive API calls while user is typing.
     */
    useEffect(() => {
      if (!gridApi) return;
  
      // Update the datasource with current debouncedSearchText and refresh
      gridApi.updateGridOptions({
        serverSideDatasource: serverSideDatasource,
      });
    }, [gridApi, debouncedSearchText, serverSideDatasource]);
  
    /**
     * Handle row selection changes.
     * Extracts selected row data and calls the user-provided callback.
     */
    const handleSelectionChanged = useCallback(() => {
      if (!gridApi || !onSelectionChanged) return;
  
      const selectedNodes = gridApi.getSelectedNodes();
      const selectedData = selectedNodes
        .map((node) => node.data)
        .filter(Boolean) as TData[];
      onSelectionChanged(selectedData);
    }, [gridApi, onSelectionChanged]);
  
    /**
     * Handle single row click events.
     * Calls the user-provided onRowClicked callback with the clicked row's data.
     */
    const handleRowClicked = useCallback(
      (event: RowClickedEvent<TData>) => {
        if (onRowClicked && event.data) {
          onRowClicked(event.data);
        }
      },
      [onRowClicked]
    );
  
    /**
     * Handle double-click events on rows.
     * Calls the user-provided onRowDoubleClicked callback with the double-clicked row's data.
     */
    const handleRowDoubleClicked = useCallback(
      (event: RowDoubleClickedEvent<TData>) => {
        if (onRowDoubleClicked && event.data) {
          onRowDoubleClicked(event.data);
        }
      },
      [onRowDoubleClicked]
    );
  
    /**
     * Main AG Grid configuration object.
     * Combines default settings with user-provided options to create the final grid configuration.
     */
    const gridOptions = useMemo<GridOptions<TData>>(
      () => ({
        // Data source configuration
        rowModelType: 'serverSide' as RowModelType,
  
        // Theme configuration - using legacy theme with our custom balham styling
        theme: 'legacy',
  
        // Caching configuration for performance optimization
        cacheBlockSize,
        maxBlocksInCache,
  
        // Row selection configuration - updated to new object format (v32.2+)
        rowSelection: rowSelection,
  
        // Server-side sorting and filtering configuration
        serverSideSortAllLevels: true, // Enable server-side sorting for all levels
        serverSideEnableClientSideSort: false, // Use server-side sorting instead of client-side
  
        // Row grouping configuration
        autoGroupColumnDef: autoGroupColumnDef || {
          headerName: 'Group',
          minWidth: 200,
          cellRenderer: 'agGroupCellRenderer',
        },
        // Only set groupDefaultExpanded for clientSide row model
        ...(additionalGridOptions?.rowModelType === 'clientSide' &&
        groupDefaultExpanded !== undefined
          ? { groupDefaultExpanded }
          : {}),
  
        // UI and interaction options
        animateRows: true,
        suppressCellFocus: false,
        enableCellTextSelection: true,
  
        // Scrolling behavior
        suppressHorizontalScroll: false,
        alwaysShowHorizontalScroll: false,
  
        // Context menu configuration
        allowContextMenuWithControlKey: true,
  
        // Status bar configuration - only components compatible with server-side row model
        statusBar: {
          statusPanels: [
            // Note: agTotalAndFilteredRowCountComponent and agFilteredRowCountComponent
            // are not compatible with server-side row model as they use forEachNodeAfterFilter
            { statusPanel: 'agSelectedRowCountComponent', align: 'left' },
            { statusPanel: 'agAggregationComponent', align: 'right' },
          ],
        },
  
        // Custom overlay templates (empty to hide default overlays)
        overlayLoadingTemplate: '', // We use our own loading indicator
        overlayNoRowsTemplate: '', // Custom no data state if needed
  
        // Disable pagination in favor of infinite scrolling
        pagination: false,
  
        // Register custom tool panel components
        components: {
          ...(additionalGridOptions?.components || {}),
          ...(customToolPanels || []).reduce<Record<string, React.ComponentType>>(
            (acc, panel) => {
              acc[panel.id] = panel.component;
              return acc;
            },
            {}
          ),
        },
  
        // Merge any additional user-provided grid options
        ...additionalGridOptions,
      }),
      [
        cacheBlockSize,
        maxBlocksInCache,
        rowSelection,
        autoGroupColumnDef,
        groupDefaultExpanded,
        additionalGridOptions,
        customToolPanels,
      ]
    );
  
    return (
      <div className={cn('w-full', className)}>
        {(showGlobalSearch || headerRightSlot) && (
          <div className="flex items-center gap-2 pb-4">
            {showGlobalSearch && (
              <div className="relative max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder={searchPlaceholder}
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  className="pl-10"
                />
              </div>
            )}
            <div className="flex-1" />
            {headerRightSlot && (
              <div className="flex-shrink-0">{headerRightSlot}</div>
            )}
          </div>
        )}
  
        {/* Loading overlay */}
        {loading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/80">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        )}
  
        {/* AG Grid */}
        <div className="rounded-md border bg-card">
          <div
            className={cn('ag-theme-balham', 'relative')}
            style={
              {
                height,
                '--ag-row-height': `${rowHeight}px`,
              } as React.CSSProperties
            }
          >
            <AgGridReact<TData>
              ref={gridRef}
              gridOptions={gridOptions}
              columnDefs={processedColumns}
              defaultColDef={defaultColDef}
              sideBar={sideBar}
              rowHeight={rowHeight}
              getRowId={getRowId}
              onGridReady={handleGridReady}
              onSelectionChanged={handleSelectionChanged}
              onRowClicked={handleRowClicked}
              onRowDoubleClicked={handleRowDoubleClicked}
            />
          </div>
        </div>
      </div>
    );
  }
  