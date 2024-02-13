import {
	Box,
	Button,
	Divider,
	Grid,
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

const EditMainArea = () => {
	const params = useParams();

	const id = params.id as unknown as number;

	const { mainAreas } = useAppSelector((state) => state.customer);

	const dispatch = useAppDispatch();

	useEffect(() => {
		if (!mainAreas || (mainAreas.length === 0 && id)) {
			dispatch(fetchMainArea({ mainAreaId: id }));
		}
	}, [dispatch]);

	const [values, setValues] = useState<MainArea>();

	useEffect(() => {
		setValues(getMainAreaById(id));
	});

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<MainArea>();

	const navigate = useNavigate();

	function getMainAreaById(id: number): MainArea | undefined {
		return mainAreas.find((mainArea) => mainArea.mainAreaId === Number(id));
	}

	function onSubmit(e: MainArea) {
		setIsLoading(true);
		e.mainAreaId = id;
		updateMainArea(e)
			.then((_data) => {
				setIsLoading(false);
				navigate("/app/sales/mainArea");
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
			<Typography variant="h1">Edit Customer</Typography>
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
							Customer Name *
						</Typography>
						<Controller
							name="name"
							control={control}
							defaultValue={values.name}
							rules={{
								required: "Name is required",
							}}
							render={({ field }) => (
								<TextField
									{...field}
									sx={{ width: "80%" }}
									label="Name"
									error={Boolean(errors.name)}
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
							onClick={() => navigate("/app/sales/mainArea")}
						>
							Cancel
						</Button>
					</Box>
				</Box>
			)}
		</Paper>
	);
};
export default EditMainArea;
