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
}: {
	rows: any;
	columns: GridColDef[];
	isLoading: boolean;
	isServerPagination: boolean;
	onPaginationModelChange?: Function;
	rowCount?: number;
	onRowSelect: Function;
	rowOnClick?: Function;
}) {
	return (
		<div>
			<DataGrid
				rows={rows}
				columns={columns}
				initialState={{
					pagination: {
						paginationModel: { page: 0, pageSize: 10 },
					},
					filter: {
						filterModel: {
							items: [],
							quickFilterExcludeHiddenColumns: true,
						},
					},
				}}
				pageSizeOptions={[10, 20]}
				checkboxSelection
				disableRowSelectionOnClick
				slots={{
					loadingOverlay: LinearProgress,
				}}
				loading={isLoading}
				sx={{
					"&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
						outline: "none !important",
					},
				}}
				rowCount={rowCount}
				paginationMode={isServerPagination ? "server" : "client"}
				onPaginationModelChange={(e) =>
					//@ts-ignore
					isServerPagination ? onPaginationModelChange(e) : console.log(e)
				}
				onRowSelectionModelChange={(e) => onRowSelect(e)}
				style={{ borderRadius: "25px", padding: "2%" }}
				autoHeight
				//@ts-ignore
				onRowClick={(e) => rowOnClick(e)}
			/>
		</div>
	);
}
