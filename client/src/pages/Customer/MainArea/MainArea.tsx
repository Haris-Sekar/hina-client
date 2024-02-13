import { useEffect, useState } from "react";
import {
	createMainAreaRow,
	mainArea,
} from "../../../Constants/DataTableColumn";
import ModulePage from "../../../components/ModulePage/ModulePage";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { fetchMainArea } from "../../../store/Reducers/CustomerReducers";
import { mainAreaRowData } from "../../../Types/Customer";
import { useNavigate } from "react-router-dom";
import { deleteMainAreas } from "../../../api/services/customer";
import DialogBox from "../../../components/DialogBox";
import { IDialogBox } from "../../../Types/Form";
import { Typography } from "@mui/material";

const MainArea = () => {
	const { mainAreas, loading } = useAppSelector((state) => state.customer);
	let rows: mainAreaRowData[] = [];

	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchMainArea({}));
	}, [dispatch]);

	if (mainAreas && mainAreas.length > 0) {
		mainAreas.map((mainAreas) => {
			rows.push(createMainAreaRow(mainAreas.mainAreaId, mainAreas.name));
		});
	}

	const navigate = useNavigate();

	function addMainArea() {
		navigate("/app/sales/mainArea/add?from=detail");
	}

	function editCallback(e: number[]) {
		navigate(`/app/sales/mainArea/${e[0]}/edit?from=detail`);
	}

	const [deleteBtnLoading, setDeleteBtnLoading] = useState(false);

	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
	const [deleteDialogDetails, setDeleteDialogDetails] = useState<IDialogBox>({
		description: <></>,
		failureBtnText: "",
		id: "",
		successBtnText: "",
		title: "",
	});

	function deleteCallBack(e: number[]) {
		setDeleteDialogDetails({
			title: "Confirm Delete these main Areas",
			description: (
				<Typography>
					Once these main areas are deleted it can not be restored
				</Typography>
			),
			failureBtnText: "Cancle",
			successBtnText: "Delete",
			id: JSON.stringify(e),
		});
		setDeleteDialogOpen(true);
	}

	function confirmDeleteCallBack(_temp: any, e: string) {
		setDeleteDialogOpen(false);
		const ids = JSON.parse(e) as number[];
		setDeleteBtnLoading(true);
		deleteMainAreas(ids)
			.then(() => {
				dispatch(fetchMainArea({}));
				setDeleteBtnLoading(false);
			})
			.catch(() => setDeleteBtnLoading(false));
	}

	return (
		<>
			{deleteDialogOpen && (
				<DialogBox
					successCallBack={confirmDeleteCallBack}
					dialogDetails={deleteDialogDetails}
					open={deleteDialogOpen}
					setOpen={setDeleteDialogOpen}
				/>
			)}
			<ModulePage
				moduleName="Main Area"
				rows={rows}
				columns={mainArea}
				isLoading={loading}
				addCallBack={addMainArea}
				editCallBack={editCallback}
				deleteCallBack={deleteCallBack}
				isServerPagination={false}
				deleteBtnLoading={deleteBtnLoading}
			/>
		</>
	);
};

export default MainArea;
