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
import { Backdrop, Box, Fade, Modal, Typography } from "@mui/material";
import {
	fetchItem,
	fetchItemCount,
} from "../../../store/Reducers/InventoryReducerts";
import { Item, ItemRowData } from "../../../Types/Inventory";
import { deleteItemGroup } from "../../../api/services/inventory";

const Items = () => {
	const { items, loading, itemCount } = useAppSelector(
		(state) => state.inventory
	);
	const rows: ItemRowData[] = [];

	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchItemCount());
	}, [dispatch]);

	useEffect(() => {
		if (itemCount > 0) {
			onPaginationModelChange({ page: 0, pageSize: 10 });
		}
	}, [itemCount]);

	if (items && items.length > 0) {
		items.map((group) => {
			rows.push(
				createItemRow(
					group.itemId,
					group.itemName,
					group.hsnCode,
					group.itemGroupId.name
				)
			);
		});
	}

	function onPaginationModelChange(e: any) {
		dispatch(
			fetchItem({
				page: e.page,
				range: e.pageSize,
			})
		);
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

	const [open, setOpen] = useState(false);
	const handleClose = () => setOpen(false);

	const style = {
		position: "absolute" as "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		width: 400,
		bgcolor: "background.paper",
		boxShadow: 24,
		p: 4,
	};

	const [selectedItem, setSelectedItem] = useState<Item>();

	const handleColumnSelect = (e: any) => {
		navigate(`/app/items/${e.id}`);
	};

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
				isServerPagination={true}
				deleteBtnLoading={deleteBtnLoading}
				rowOnClick={handleColumnSelect}
				onPaginationModelChange={onPaginationModelChange}
				rowCount={itemCount}
			/>
			<Modal
				aria-labelledby="spring-modal-title"
				aria-describedby="spring-modal-description"
				open={open}
				onClose={handleClose}
				closeAfterTransition
				slots={{ backdrop: Backdrop }}
				slotProps={{
					backdrop: {
						TransitionComponent: Fade,
					},
				}}
			>
				<Fade in={open}>
					<Box sx={style}>
						<Typography id="spring-modal-title" variant="h6" component="h2">
							Text in a modal
						</Typography>
						<Typography id="spring-modal-description" sx={{ mt: 2 }}>
							`` Duis mollis, est non commodo luctus, nisi erat porttitor
							ligula.
						</Typography>
					</Box>
				</Fade>
			</Modal>
		</>
	);
};

export default Items;
