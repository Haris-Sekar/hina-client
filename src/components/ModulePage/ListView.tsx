/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import {
  DataGrid,
  GridColDef, 
} from "@mui/x-data-grid";
import CustomToolbar from "./CustomToolbar";

export default function ListView({
  rows,
  columns,
  isLoading,
  isServerPagination,
  onPaginationModelChange,
  rowCount,
  onRowSelect,
  rowOnClick,
  isServerSideSort,
  onSortModelChange,
  columnVisibilityModel,
  checkboxSelection,
  toolBarProps,
  inlineEditCallback,
}: {
  rows: any;
  columns: GridColDef[];
  isLoading: boolean;
  isServerPagination: boolean;
  onPaginationModelChange?: Function;
  rowCount?: number;
  onRowSelect: Function;
  rowOnClick?: Function;
  toolBar?: any;
  isServerSideSort?: boolean;
  onSortModelChange?: Function;
  columnVisibilityModel?: Record<string, boolean>;
  checkboxSelection?: boolean;
  toolBarProps?: {
    moduleName?: string;
    showAddButton?: boolean | false;
    showBulkEdit?: boolean | false;
    showBulkDelete?: boolean | false;
    showBackButton?: boolean | false;
    selectedIds?: number[];
    addCallBack?: () => void;
    editCallBack?: () => void;
    deleteCallBack?: () => void;
  };
  inlineEditCallback?: (
    newRow: any,
    oldRow: any,
    params: any
  ) => Promise<any> | any;
}) {
  return (
    <div style={{ height: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        disableColumnMenu
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 25 },
          },
          filter: {
            filterModel: {
              items: [],
              quickFilterExcludeHiddenColumns: true,
            },
          },
          columns: {
            columnVisibilityModel: columnVisibilityModel,
          },
        }}
        pageSizeOptions={[25, 50, 100]}
        checkboxSelection={checkboxSelection}
        disableColumnFilter
        editMode="row"
        rowHeight={40}
        disableRowSelectionOnClick
        slotProps={{
          loadingOverlay: {
            variant: "linear-progress",
            noRowsVariant: "skeleton",
          },
          toolbar: {
            moduleName: toolBarProps?.moduleName || "",
            showAddButton: toolBarProps?.showAddButton || false,
            showBulkEdit: toolBarProps?.showBulkEdit || false,
            showBulkDelete: toolBarProps?.showBulkDelete || false,
            showBackButton: toolBarProps?.showBackButton || false,
            addCallBack: toolBarProps?.addCallBack || (() => {}),
            editCallBack: toolBarProps?.editCallBack || (() => {}),
            deleteCallBack: toolBarProps?.deleteCallBack || (() => {}),
          },
        }}
        processRowUpdate={inlineEditCallback}
        slots={{
          toolbar: CustomToolbar,
        }}
        loading={isLoading}
        sx={{
          height: "100%",
          border: "none",
          "& .MuiDataGrid-cell:has(.no-padding)": {
            padding: 0,
          },
          "& .MuiDataGrid-cell:has(.cursor-pointer)": {
            cursor: "pointer",
          },
        }}
        rowCount={rowCount}
        paginationMode={isServerPagination ? "server" : "client"}
        onPaginationModelChange={(e) =>
          isServerPagination && onPaginationModelChange
            ? onPaginationModelChange(e)
            : null
        }
        onRowSelectionModelChange={(e) => onRowSelect(e)}
        onRowClick={(e) => rowOnClick && rowOnClick(e)}
        sortingMode={isServerSideSort ? "server" : "client"}
        onSortModelChange={(e) => onSortModelChange && onSortModelChange(e)}
        showCellVerticalBorder
        showColumnVerticalBorder
        showToolbar
      />
    </div>
  );
}
