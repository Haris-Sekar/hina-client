import { useEffect, useState } from "react";
import {
	createItemRow,
	Items as DItem,
} from "../../../Constants/DataTableColumn";
import ModulePage from "../../../components/ModulePage/ModulePage";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { useNavigate } from "react-router-dom";
import DialogBox from "../../../components/DialogBox";
import { IDialogBox } from "../../../Types/Form";
import { Typography } from "@mui/material";
import {fetchItem} from "../../../store/Reducers/InventoryReducerts";
import {ItemRowData} from "../../../Types/Inventory";
import { deleteItemGroup } from "../../../api/services/inventory";

const Items = () => {
	const { items , loading } = useAppSelector((state) => state.inventory);
	const rows: ItemRowData[] = [];

	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchItem({}));
	}, [dispatch]);

	if (items && items.length > 0) {
		items.map((group) => {
			rows.push(createItemRow(group.itemId, group.itemName, group.hsnCode, group.itemGroupId.name));
		});
	}

	const navigate = useNavigate();

	function addItem() {
		navigate("/app/items/add?from=detail");
	}

	function editCallback(e: number[]) {
		navigate(`/app/items/${e[0]}/edit?from=detail`);
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
			title: "Confirm Delete these items",
			description: (
				<Typography>
					Once these items are deleted it can not be restored
				</Typography>
			),
			failureBtnText: "Cancel",
			successBtnText: "Delete",
			id: JSON.stringify(e),
		});
		setDeleteDialogOpen(true);
	}

	function confirmDeleteCallBack(_temp: any, e: string) {
		setDeleteDialogOpen(false);
		const ids = JSON.parse(e) as number[];
		setDeleteBtnLoading(true);
		deleteItemGroup(ids)
			.then(() => {
				dispatch(fetchItem({}));
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
				moduleName="Item"
				rows={rows}
				columns={DItem}
				isLoading={loading}
				addCallBack={addItem}
				editCallBack={editCallback}
				deleteCallBack={deleteCallBack}
				isServerPagination={false}
				deleteBtnLoading={deleteBtnLoading}
			/>
		</>
	);
};

export default Items;
