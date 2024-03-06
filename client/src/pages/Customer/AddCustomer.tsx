import {
	Autocomplete,
	Box,
	Button,
	Divider,
	Grid,
	InputAdornment,
	Paper,
	TextField,
	Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { Customer } from "../../Types/Customer";
import CustomTooltip from "../../components/Tooltip";
import LoadingButton from "@mui/lab/LoadingButton";
import { useEffect, useState } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { addCustomer } from "../../api/services/customer";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { fetchMainArea } from "../../store/Reducers/CustomerReducers";
import { useNavigate } from "react-router-dom";

const AddCustomer = () => {
	const {
		control,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<Customer>();

	const navigate = useNavigate();

	function onSubmit(e: Customer, event: any) {
		setIsLoading(true);
		addCustomer(e)
			.then((data) => {
				console.log(data);
				setIsLoading(false);
				if (event.nativeEvent.submitter.id !== "saveAndNew") {
					navigate("/app/sales/customer");
				} else {
					reset();
				}
			})
			.catch((e) => {
				setIsLoading(false);
			});
	}

	const [isLoading, setIsLoading] = useState(false);

	function onError() {}

	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchMainArea({}));
	}, []);

	const { mainAreas } = useAppSelector((state) => state.customer);

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
			<Typography variant="h1">New Customer</Typography>
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
						Customer Name *
					</Typography>
					<Controller
						name="firstName"
						control={control}
						defaultValue=""
						rules={{
							required: "First Name is required",
						}}
						render={({ field }) => (
							<TextField
								{...field}
								sx={{ width: "37%" }}
								label="First Name"
								error={Boolean(errors.firstName)}
								helperText={errors.firstName?.message}
								required
							/>
						)}
					/>
					<Controller
						name="lastName"
						control={control}
						defaultValue=""
						render={({ field }) => (
							<TextField
								{...field}
								label="Last Name"
								sx={{ width: "37%", ml: "6%" }}
								error={Boolean(errors.lastName)}
								helperText={errors.lastName?.message}
							/>
						)}
					/>
				</Grid>
				<Grid
					item
					sx={{
						display: "flex",
						alignItems: "center",
						width: "100%",
					}}
				>
					<Typography variant="subtitle1" sx={{ width: "20%" }}>
						Company Name *
						<CustomTooltip text="Company Name will be used to bill customer under this name" />
					</Typography>
					<Controller
						name="companyName"
						control={control}
						defaultValue=""
						rules={{
							required: "Company Name is required",
						}}
						render={({ field }) => (
							<TextField
								{...field}
								sx={{ width: "80%" }}
								label="Company Name"
								error={Boolean(errors.companyName)}
								helperText={errors.companyName?.message}
								required
							/>
						)}
					/>
				</Grid>
				<Grid
					item
					sx={{
						display: "flex",
						alignItems: "center",
						width: "100%",
					}}
				>
					<Typography variant="subtitle1" sx={{ width: "20%" }}>
						Phone Number *
					</Typography>
					<Controller
						name="phoneNumber"
						control={control}
						rules={{
							required: "Phone number is required",
						}}
						render={({ field }) => (
							<TextField
								{...field}
								sx={{ width: "80%" }}
								type="number"
								error={Boolean(errors.phoneNumber)}
								helperText={errors.phoneNumber?.message}
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">+91</InputAdornment>
									),
								}}
								required
							/>
						)}
					/>
				</Grid>
				<Grid
					item
					sx={{
						display: "flex",
						alignItems: "center",
						width: "100%",
					}}
				>
					<Typography variant="subtitle1" sx={{ width: "20%" }}>
						Email
					</Typography>
					<Controller
						name="email"
						control={control}
						render={({ field }) => (
							<TextField
								{...field}
								sx={{ width: "80%" }}
								type="email"
								error={Boolean(errors.email)}
								helperText={errors.email?.message}
							/>
						)}
					/>
				</Grid>
				<Grid
					item
					sx={{
						display: "flex",
						alignItems: "center",
						width: "100%",
					}}
				>
					<Typography variant="subtitle1" sx={{ width: "20%" }}>
						GST Number
					</Typography>
					<Controller
						name="gstNumber"
						control={control}
						render={({ field }) => (
							<TextField
								{...field}
								sx={{ width: "80%" }}
								error={Boolean(errors.gstNumber)}
								helperText={errors.gstNumber?.message}
							/>
						)}
					/>
				</Grid>
				<Grid
					item
					sx={{
						display: "flex",
						alignItems: "center",
						width: "100%",
					}}
				>
					<Typography variant="subtitle1" sx={{ width: "20%" }}>
						Address Line 1 *
					</Typography>
					<Controller
						name="address1"
						control={control}
						defaultValue=""
						rules={{
							required: "Atleast one line of address is required",
						}}
						render={({ field }) => (
							<TextField
								{...field}
								sx={{ width: "80%" }}
								label="Address Line 1"
								error={Boolean(errors.address1)}
								helperText={errors.address1?.message}
								required
							/>
						)}
					/>
				</Grid>
				<Grid
					item
					sx={{
						display: "flex",
						alignItems: "center",
						width: "100%",
					}}
				>
					<Typography variant="subtitle1" sx={{ width: "20%" }}>
						Address Line 2
					</Typography>
					<Controller
						name="address2"
						control={control}
						defaultValue=""
						render={({ field }) => (
							<TextField
								{...field}
								sx={{ width: "80%" }}
								error={Boolean(errors.address2)}
								helperText={errors.address2?.message}
							/>
						)}
					/>
				</Grid>
				<Grid
					item
					sx={{
						display: "flex",
						alignItems: "center",
						width: "100%",
					}}
				>
					<Typography variant="subtitle1" sx={{ width: "20%" }}>
						Main Area *
					</Typography>
					<Controller
						name="mainAreaId"
						control={control}
						rules={{
							required: "Main area is required",
						}}
						render={({ ...field }) => (
							<Autocomplete
								{...field}
								disablePortal
								id="combo-box-demo"
								options={mainAreas.map((mainArea) => {
									return { id: mainArea.mainAreaId, label: mainArea.name };
								})}
								sx={{ width: "80%" }}
								onChange={(_event, value) => {
									control._formValues.mainAreaId = value?.id;
									return value?.id;
								}}
								renderInput={(params) => (
									<TextField
										{...params}
										helperText={errors.mainAreaId?.message}
										error={Boolean(errors.mainAreaId)}
										label="Main Area"
										required
									/>
								)}
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
						endIcon={<CancelIcon />}
						onClick={() => navigate("/app/sales/customer")}
					>
						Cancel
					</Button>
				</Box>
			</Box>
		</Paper>
	);
};
export default AddCustomer;
