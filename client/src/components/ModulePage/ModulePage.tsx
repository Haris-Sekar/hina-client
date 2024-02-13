import { Box, Button, ButtonGroup, Paper } from "@mui/material";
import "./modulePage.css";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import ListView from "./ListView";
import { GridColDef } from "@mui/x-data-grid";
import { useState } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
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
	deleteBtnLoading?: boolean;
	rowOnClick?: Function;
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
	deleteBtnLoading,
	rowOnClick,
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
									onClick={(_e) => editCallBack(selectedIds)}
								>
									Edit {moduleName}
								</Button>
							)}
							<LoadingButton
								variant="contained"
								color="error"
								endIcon={<DeleteForeverOutlinedIcon />}
								onClick={(_e) => deleteCallBack(selectedIds)}
								loading={deleteBtnLoading}
							>
								Delete {moduleName}
							</LoadingButton>
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

			<Paper
				sx={{
					borderRadius: "25px",
				}}
			>
				<ListView
					rows={rows}
					columns={columns}
					isLoading={isLoading}
					onPaginationModelChange={onPaginationModelChange}
					rowCount={rowCount}
					onRowSelect={onRowSelect}
					isServerPagination={isServerPagination}
					rowOnClick={rowOnClick}
				/>
			</Paper>
		</div>
	);
};

export default ModulePage;
