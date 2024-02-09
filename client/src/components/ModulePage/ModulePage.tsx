import { Box, Button, ButtonGroup, Paper } from "@mui/material";
import "./modulePage.css";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import ListView from "./ListView";
import { GridColDef } from "@mui/x-data-grid";
import { useState } from "react";
interface IModulePage {
	moduleName: string;
	rows: any;
	columns: GridColDef[];
	isLoading: boolean;
	isServerPagination: boolean;
	onPaginationModelChange?: Function;
	rowCount?: number;
	addCallBack: Function;
	editCallBack: Function;
	deleteCallBack: Function;
}

const ModulePage = ({
	moduleName,
	rows,
	columns,
	isLoading,
	onPaginationModelChange,
	rowCount,
	editCallBack,
	deleteCallBack,
	addCallBack,
	isServerPagination,
}: IModulePage) => {
	const [selectedIds, setSelectedIds] = useState<number[]>([]);
	function onRowSelect(ids: number[]) {
		setSelectedIds(ids);
	}

	return (
		<div className="moduleContainer">
			<Box sx={{ display: "flex", justifyContent: "space-between" }}>
				<div>
					{selectedIds.length > 0 && (
						<ButtonGroup>
							{selectedIds.length === 1 && (
								<Button
									startIcon={<ModeEditOutlineOutlinedIcon />}
									variant="contained"
									onClick={(e) => editCallBack(selectedIds)}
								>
									Edit {moduleName}
								</Button>
							)}
							<Button
								variant="contained"
								color="error"
								endIcon={<DeleteForeverOutlinedIcon />}
								onClick={(e) => deleteCallBack(selectedIds)}
							>
								Delete {moduleName}
							</Button>
						</ButtonGroup>
					)}
				</div>
				<Button
					variant="contained"
					sx={{ width: "fit-content" }}
					startIcon={<AddCircleOutlinedIcon />}
					onClick={(e) => addCallBack(e)}
				>
					Add {moduleName}
				</Button>
			</Box>

			<Paper sx={{ width: "100%", borderRadius: "25px" }}>
				<ListView
					rows={rows}
					columns={columns}
					isLoading={isLoading}
					onPaginationModelChange={onPaginationModelChange}
					rowCount={rowCount}
					onRowSelect={onRowSelect}
					isServerPagination={isServerPagination}
				/>
			</Paper>
		</div>
	);
};

export default ModulePage;
