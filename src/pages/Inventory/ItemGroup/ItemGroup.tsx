import { useEffect, useState } from "react";
import {
	createMainAreaRow,
	itemGroup as DItemgroup,
} from "../../../Constants/DataTableColumn";
import ModulePage from "../../../components/ModulePage/ModulePage";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { useNavigate } from "react-router-dom"; 
import DialogBox from "../../../components/DialogBox";
import { IDialogBox } from "../../../Types/Form";
import { Typography } from "@mui/material";
import { fetchItemGroup } from "../../../store/Reducers/InventoryReducerts";
import { ItemGroupRowData } from "../../../Types/Inventory";
import { deleteItemGroup } from "../../../api/services/inventory";

const ItemGroup = () => {
	const { itemGroup, loading } = useAppSelector((state) => state.inventory);
	let rows: ItemGroupRowData[] = [];

	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchItemGroup({}));
	}, [dispatch]);

	if (itemGroup && itemGroup.length > 0) {
		itemGroup.map((group) => {
			rows.push(createMainAreaRow(group.groupId, group.name));
		});
	}

	const navigate = useNavigate();

	function addItemgroup() {
		navigate("/app/itemgroup/add?from=detail");
	}

	function editCallback(e: number[]) {
		navigate(`/app/itemgroup/${e[0]}/edit?from=detail`);
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
			title: "Confirm Delete these item groups",
			description: (
				<Typography>
					Once these item groups are deleted it can not be restored
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
		deleteItemGroup(ids)
			.then(() => {
				dispatch(fetchItemGroup({}));
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
				moduleName="Item Group"
				rows={rows}
				columns={DItemgroup}
				isLoading={loading}
				addCallBack={addItemgroup}
				editCallBack={editCallback}
				deleteCallBack={deleteCallBack}
				isServerPagination={false}
				deleteBtnLoading={deleteBtnLoading}
			/>
		</>
	);
};

export default ItemGroup;
