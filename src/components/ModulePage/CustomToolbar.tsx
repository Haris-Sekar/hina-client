import { Button, Divider, Typography } from "@mui/material";
import { Toolbar, useGridApiContext } from "@mui/x-data-grid";
import { GridToolbarProps } from "@mui/x-data-grid/internals";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useState } from "react";
declare module "@mui/x-data-grid" {
	interface ToolbarPropsOverrides {
		moduleName?: string;
		showAddButton?: boolean;
		showBulkEdit?: boolean;
		showBulkDelete?: boolean;
		addCallBack?: () => void;
		editCallBack?: () => void;
		deleteCallBack?: () => void;
	}
}

type ToolbarProps = GridToolbarProps & {
	moduleName?: string;
	showAddButton?: boolean;
	showBulkEdit?: boolean;
	showBulkDelete?: boolean;
	addCallBack?: () => void;
	editCallBack?: () => void;
	deleteCallBack?: () => void;
};

function CustomToolbar({
	moduleName,
	showAddButton,
	addCallBack,
	showBulkEdit,
	showBulkDelete,
	editCallBack,
	deleteCallBack,
}: ToolbarProps) {
	const api = useGridApiContext();

	const [isBulkCheckboxSelected, setIsBulkCheckboxSelected] = useState(false);

	api.current.subscribeEvent("headerSelectionCheckboxChange", (params) => { 
		setIsBulkCheckboxSelected(params.value);
	});

	api.current.subscribeEvent("rowSelectionCheckboxChange", (params) => {
		setIsBulkCheckboxSelected(params.value);
	});

	return (
		<Toolbar>
			<Typography fontWeight="bolder" sx={{ flex: 1, mx: 0.5, fontSize: "1.5rem" }}>
				{moduleName} 
			</Typography>
			{isBulkCheckboxSelected && (
				<>
					{showBulkEdit && editCallBack && (
						<Button
							variant="contained"
							sx={{ width: "fit-content" }}
							startIcon={<AddCircleOutlineIcon />}
							onClick={() => editCallBack()}
						>
							Edit {moduleName}
						</Button>
					)}
					{showBulkDelete && deleteCallBack && (
						<Button
							variant="contained"
							color="error"
							sx={{ width: "fit-content", ml: 1 }}
							onClick={() => deleteCallBack()}
						>
							Delete {moduleName}
						</Button>
					)}
				</>
			)}

			<Divider
				orientation="vertical"
				variant="middle"
				flexItem
				sx={{ mx: 0.5 }}
			/>
            {showAddButton && addCallBack && (
				<Button
					variant="contained"
					sx={{ width: "fit-content" }}
					startIcon={<AddCircleOutlineIcon />}
					onClick={addCallBack}
				>
					Add {moduleName}
				</Button>
			)}
		</Toolbar>
	);
}

export default CustomToolbar;
