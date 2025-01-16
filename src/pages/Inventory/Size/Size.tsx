import { useEffect, useState } from "react";
import {
	createSizeRow,
	size as DSize,
} from "../../../Constants/DataTableColumn";
import ModulePage from "../../../components/ModulePage/ModulePage";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { useNavigate } from "react-router-dom";
import DialogBox from "../../../components/DialogBox";
import { IDialogBox } from "../../../Types/Form";
import { Typography } from "@mui/material";
import { fetchSize } from "../../../store/Reducers/InventoryReducerts";
import { SizeRowData } from "../../../Types/Inventory";
import { deleteSize } from "../../../api/services/inventory";

const Size = () => {
	const { size, loading } = useAppSelector((state) => state.inventory);
	let rows: SizeRowData[] = [];

	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchSize({}));
	}, [dispatch]);

	if (size && size.length > 0) {
		size.map((s) => {
			rows.push(createSizeRow(s.sizeId, s.size));
		});
	}

	const navigate = useNavigate();

	function addSize() {
		navigate("/app/size/add?from=detail");
	}

	function editCallback(e: number[]) {
		navigate(`/app/size/${e[0]}/edit?from=detail`);
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
			title: "Confirm Delete these size's",
			description: (
				<Typography>
					Once these size's are deleted it can not be restored
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
		deleteSize(ids)
			.then(() => {
				dispatch(fetchSize({}));
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
				moduleName="Size"
				rows={rows}
				columns={DSize}
				isLoading={loading}
				addCallBack={addSize}
				editCallBack={editCallback}
				deleteCallBack={deleteCallBack}
				isServerPagination={false}
				deleteBtnLoading={deleteBtnLoading}
			/>
		</>
	);
};

export default Size;
