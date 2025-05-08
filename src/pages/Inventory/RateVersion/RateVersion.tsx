import { useEffect, useState } from "react";
import { createRateVersionRow, rateVersion as DRateVersion } from "../../../Constants/DataTableColumn";
import ModulePage from "../../../components/ModulePage/ModulePage";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { useNavigate } from "react-router-dom";
import DialogBox from "../../../components/DialogBox";
import { IDialogBox } from "../../../Types/Form";
import { Typography } from "@mui/material";
import {fetchRateVersion} from "../../../store/Reducers/InventoryReducerts";
import { RateVersionRowData} from "../../../Types/Inventory";
import {  deleteRateVersion} from "../../../api/services/inventory";

const RateVersion = () => {
	const { rateVersion, loading } = useAppSelector((state) => state.inventory);
	const rows: RateVersionRowData[] = [];

	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchRateVersion({}));
	}, [dispatch]);

	if (rateVersion && rateVersion.length > 0) {
		rateVersion.map((group) => {
			rows.push(createRateVersionRow(group.versionId, group.name, group.isDefault));
		});
	}

	const navigate = useNavigate();

	function addRateVersion() {
		navigate("/app/rateVersion/add?from=detail");
	}

	function editCallback(e: number[]) {
		navigate(`/app/rateVersion/${e[0]}/edit?from=detail`);
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
					Once these rate versions are deleted it can not be restored
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
		deleteRateVersion(ids)
			.then(() => {
				dispatch(fetchRateVersion({}));
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
				moduleName="Rate Version"
				rows={rows}
				columns={DRateVersion}
				isLoading={loading}
				addCallBack={addRateVersion}
				editCallBack={editCallback}
				deleteCallBack={deleteCallBack}
				isServerPagination={false}
				deleteBtnLoading={deleteBtnLoading}
			/>
		</>
	);
};

export default RateVersion;
