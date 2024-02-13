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
import { fetchSize } from "../../../store/Reducers/InventoryReducerts";
import { Size } from "../../../Types/Inventory";
import { updateSize } from "../../../api/services/inventory";

const EditSize = () => {
	const params = useParams();

	const id = params.id as unknown as number;

	const { size } = useAppSelector((state) => state.inventory);

	const dispatch = useAppDispatch();

	useEffect(() => {
		if (!size || (size.length === 0 && id)) {
			dispatch(fetchSize({ sizeId: id }));
		}
	}, [dispatch]);

	const [values, setValues] = useState<Size>();

	useEffect(() => {
		setValues(getSizeById(id));
	});

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<Size>();

	const navigate = useNavigate();

	function getSizeById(id: number): Size | undefined {
		return size.find((s) => s.sizeId === Number(id));
	}

	function onSubmit(e: Size) {
		setIsLoading(true);
		e.sizeId = id;
		updateSize(e)
			.then((_data) => {
				setIsLoading(false);
				navigate("/app/size");
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
			<Typography variant="h1">Edit Size</Typography>
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
							Size *
						</Typography>
						<Controller
							name="size"
							control={control}
							defaultValue={values.size}
							rules={{
								required: "Size is required",
							}}
							render={({ field }) => (
								<TextField
									{...field}
									sx={{ width: "80%" }}
									error={Boolean(errors.size)}
									label="Group Name"
									helperText={errors.size?.message}
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

export default EditSize;
