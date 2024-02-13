import {
	Box,
	Button,
	Grid,
	Divider,
	Paper,
	TextField,
	Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { MainArea } from "../../../Types/Customer";
import LoadingButton from "@mui/lab/LoadingButton";
import { useEffect, useState } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import { updateMainArea } from "../../../api/services/customer";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { useNavigate, useParams } from "react-router-dom";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import { fetchMainArea } from "../../../store/Reducers/CustomerReducers";
import { fetchItemGroup } from "../../../store/Reducers/InventoryReducerts";
import { ItemGroup } from "../../../Types/Inventory";
import { updateItemGroup } from "../../../api/services/inventory";

const EditItemGroup = () => {
	const params = useParams();

	const id = params.id as unknown as number;

	const { itemGroup } = useAppSelector((state) => state.inventory);

	const dispatch = useAppDispatch();

	useEffect(() => {
		if (!itemGroup || (itemGroup.length === 0 && id)) {
			dispatch(fetchItemGroup({ itemGroupId: id }));
		}
	}, [dispatch]);

	const [values, setValues] = useState<ItemGroup>();

	useEffect(() => {
		setValues(getItemGroupById(id));
	});

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<ItemGroup>();

	const navigate = useNavigate();

	function getItemGroupById(id: number): ItemGroup | undefined {
		return itemGroup.find((group) => group.groupId === Number(id));
	}

	function onSubmit(e: ItemGroup) {
		setIsLoading(true);
		e.groupId = id;
		updateItemGroup(e)
			.then((_data) => {
				setIsLoading(false);
				navigate("/app/itemgroup");
			})
			.catch((_e) => {
				setIsLoading(false);
			});
	}

	const [isLoading, setIsLoading] = useState(false);

	function onError() {}

	return (
		<Paper
			sx={{
				padding: "2%",
				width: "60%",
				margin: "auto",
				mt: 10,
				borderRadius: 10,
				minHeight: 300,
			}}
		>
			<Typography variant="h1">Edit Item Group</Typography>
			<Divider />
			{values && (
				<Box
					component="form"
					noValidate
					onSubmit={handleSubmit(onSubmit, onError)}
					sx={{
						width: "80%",
						display: "flex",
						flexDirection: "column",
						gap: "20px",
						justifyContent: "center",
						margin: "auto",
						mt: 3,
					}}
				>
					<Grid
						item
						sx={{
							display: "flex",
							alignItems: "center",
							width: "100%",
						}}
					>
						<Typography variant="subtitle1" sx={{ width: "20%" }}>
							Group name *
						</Typography>
						<Controller
							name="name"
							control={control}
							defaultValue={values.name}
							rules={{
								required: "Group Name is required",
							}}
							render={({ field }) => (
								<TextField
									{...field}
									sx={{ width: "80%" }}
									error={Boolean(errors.name)}
									label="Group Name"
									helperText={errors.name?.message}
									required
								/>
							)}
						/>
					</Grid>
					<Box sx={{ display: "flex", gap: "2%" }}>
						<LoadingButton
							type="submit"
							variant="contained"
							sx={{ mt: 3, mb: 2, width: "fit-content" }}
							loading={isLoading}
							startIcon={<ModeEditOutlinedIcon />}
						>
							Update
						</LoadingButton>

						<Button
							variant="contained"
							color="error"
							sx={{ mt: 3, mb: 2, width: "fit-content" }}
							endIcon={<CancelIcon />}
							onClick={() => navigate("/app/itemgroup")}
						>
							Cancel
						</Button>
					</Box>
				</Box>
			)}
		</Paper>
	);
};
export default EditItemGroup;
