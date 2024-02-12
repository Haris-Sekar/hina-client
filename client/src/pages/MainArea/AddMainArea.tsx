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
import { MainArea } from "../../Types/Customer";
import CustomTooltip from "../../components/Tooltip";
import LoadingButton from "@mui/lab/LoadingButton";
import { useState } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { addMainArea } from "../../api/services/customer";
import { useNavigate } from "react-router-dom";

const AddMainArea = () => {
	const {
		control,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<MainArea>();

	const navigate = useNavigate();

	function onSubmit(e: MainArea, event: any) {
		setIsLoading(true);
		addMainArea(e)
			.then((data) => {
				console.log(data);
				setIsLoading(false);
				if (event.nativeEvent.submitter.id !== "saveAndNew") {
					navigate("/app/sales/mainArea");
				} else {
					reset({
						name: "",
					});
				}
			})
			.catch(() => {
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
			}}
		>
			<Typography variant="h1">New Main Area</Typography>
			<Divider />
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
						Main Area Name *
						<CustomTooltip text="This is used to group and identiy customer based on their locality" />
					</Typography>
					<Controller
						name="name"
						control={control}
						defaultValue=""
						rules={{
							required: "Name is required",
						}}
						render={({ field }) => (
							<TextField
								{...field}
								sx={{ width: "80%" }}
								label="Main Area Name"
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
						startIcon={<AddCircleIcon />}
						id="saveAndClose"
					>
						Save And Close
					</LoadingButton>
					<LoadingButton
						type="submit"
						variant="outlined"
						sx={{ mt: 3, mb: 2, width: "fit-content" }}
						loading={isLoading}
						startIcon={<AddCircleIcon />}
						id="saveAndNew"
					>
						Save And New
					</LoadingButton>

					<Button
						variant="contained"
						color="error"
						sx={{ mt: 3, mb: 2, width: "fit-content" }}
						onClick={() => navigate("/app/sales/mainArea")}
						endIcon={<CancelIcon />}
					>
						Cancel
					</Button>
				</Box>
			</Box>
		</Paper>
	);
};
export default AddMainArea;
