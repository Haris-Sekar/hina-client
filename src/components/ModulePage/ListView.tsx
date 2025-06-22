/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import { DataGrid, GridColDef } from "@mui/x-data-grid";
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
		selectedIds?: number[];
		addCallBack?: () => void;
		editCallBack?: () => void;
		deleteCallBack?: () => void;
	};
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
						addCallBack: toolBarProps?.addCallBack || (() => {}),
						editCallBack: toolBarProps?.editCallBack || (() => {}),
						deleteCallBack: toolBarProps?.deleteCallBack || (() => {}),
					},
				}}
				slots={{
					toolbar: CustomToolbar,
				}}
				loading={isLoading}
				sx={{
					"&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
						outline: "none !important",
					},
					height: "100%",
					border: "none",
					"& .MuiDataGrid-cell:has(.no-padding)": {
						padding: 0,
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
				editMode="cell"
				sortingMode={isServerSideSort ? "server" : "client"}
				onSortModelChange={(e) => onSortModelChange && onSortModelChange(e)}
				showCellVerticalBorder
				showColumnVerticalBorder
				showToolbar
			/>
		</div>
	);
}
