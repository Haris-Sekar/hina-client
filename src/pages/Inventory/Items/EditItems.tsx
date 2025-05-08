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
import LoadingButton from "@mui/lab/LoadingButton";
import { useEffect, useState } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { useNavigate, useParams } from "react-router-dom";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import {fetchItem, fetchItemGroup} from "../../../store/Reducers/InventoryReducerts";
import {Item, ItemGroup} from "../../../Types/Inventory";
import { updateItemGroup } from "../../../api/services/inventory";

const EditItems = () => {
	const params = useParams();

	const id = params.id as unknown as number;

	const { items } = useAppSelector((state) => state.inventory);

	const dispatch = useAppDispatch();

	useEffect(() => {
		if (!items || (items.length === 0 && id)) {
			dispatch(fetchItem({ itemId: id }));
		}
	}, [dispatch]);

	const [values, setValues] = useState<Item>();

	useEffect(() => {
		setValues(getItemById(id));
	});

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<Item>();

	const navigate = useNavigate();

	function getItemById(id: number): Item | undefined {
		return items.find((group) => group.itemId === Number(id));
	}

	function onSubmit(e: Item) {
		setIsLoading(true);
		e.itemId = id;
		updateItemGroup(e)
			.then((_data) => {
				setIsLoading(false);
				navigate("/app/items");
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
			<Typography variant="h1">Edit Item</Typography>
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
export default EditItems;
