/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import { LinearProgress } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

export default function ListView({
	rows,
	columns,
	isLoading,
	isServerPagination,
	onPaginationModelChange,
	rowCount,
	onRowSelect,
	rowOnClick,
	toolBar,
	isServerSideSort,
	onSortModelChange,
	columnVisibilityModel,
	checkboxSelection,
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
}) {
	return (
		<div style={{ height: "100%" }}>
			<DataGrid
				rows={rows}
				columns={columns}
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
				slots={{
					loadIcon: LinearProgress,
					toolbar: toolBar,
				}}
				loading={isLoading}
				sx={{
					"&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
						outline: "none !important",
					},
					height: "100%",
					border: "none",
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
				slotProps={{
					toolbar: {},
				}}
				sortingMode={isServerSideSort ? "server" : "client"}
				onSortModelChange={(e) => onSortModelChange && onSortModelChange(e)}
			/>
		</div>
	);
}
