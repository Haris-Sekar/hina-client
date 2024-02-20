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
import LoadingButton from "@mui/lab/LoadingButton";
import { useState } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { useNavigate } from "react-router-dom";
import { Size } from "../../../Types/Inventory";
import { addSize } from "../../../api/services/inventory";

const AddSize = () => {
	const {
		control,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<Size>();

	const navigate = useNavigate();

	function onSubmit(e: Size, event: any) {
		setIsLoading(true);
		addSize(e)
			.then((_data) => {
				setIsLoading(false);
				if (event.nativeEvent.submitter.id !== "saveAndNew") {
					navigate("/app/size");
				} else {
					reset();
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
			<Typography variant="h1">New Size</Typography>
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
						Size *
					</Typography>
					<Controller
						name="size"
						control={control}
						defaultValue=""
						rules={{
							required: "Size is required",
						}}
						render={({ field }) => (
							<TextField
								{...field}
								sx={{ width: "80%" }}
								label="Size"
								error={Boolean(errors.size)}
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
						onClick={() => navigate("/app/size")}
						endIcon={<CancelIcon />}
					>
						Cancel
					</Button>
				</Box>
			</Box>
		</Paper>
	);
};
export default AddSize;
