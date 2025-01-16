import {
	Autocomplete,
	Box,
	Button,
	Divider,
	FormControlLabel,
	InputAdornment,
	Paper,
	Radio,
	RadioGroup,
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

	console.log(control);

	return (
		<Paper
			sx={{
				padding: "2%",
				width: "50%",
				margin: "auto",
				mt: 10,
				borderRadius: 10,
			}}
		>
			<Typography sx={{ fontSize: "24px", fontWeight: 900, mb: "10px" }}>
				Create New Customer
			</Typography>
			<Divider />
			<Box
				component="form"
				noValidate
				onSubmit={handleSubmit(onSubmit, onError)}
				sx={{
					display: "flex",
					flexDirection: "column",
					gap: "20px",
					mt: 3,
				}}
			>
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						width: "100%",
					}}
				>
					<Typography variant="subtitle1" sx={{ width: "30%" }}>
						Customer Name *
						<CustomTooltip text="Company Name will be used to bill customer under this name" />
					</Typography>
					<Controller
						name="customerName"
						control={control}
						defaultValue=""
						rules={{
							required: "Customer name is required",
						}}
						render={({ field }) => (
							<TextField
								{...field}
								sx={{ width: "70%" }}
								label="First Name"
								error={Boolean(errors.customerName)}
								helperText={errors.customerName?.message}
								required
							/>
						)}
					/>
				</Box>
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						width: "100%",
					}}
				>
					<Typography variant="subtitle1" sx={{ width: "30%" }}>
						Customer Type
					</Typography>
					<Controller
						name="customerType"
						control={control}
						defaultValue="1"
						render={({ field }) => (
							<RadioGroup
								row
								aria-labelledby="demo-row-radio-buttons-group-label"
								{...field}
							>
								<FormControlLabel
									value="1"
									control={<Radio />}
									label="Bussiness"
								/>
								<FormControlLabel
									value="2"
									control={<Radio />}
									label="Invidual"
								/>
							</RadioGroup>
						)}
					/>
				</Box>
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						width: "100%",
					}}
				>
					<Typography variant="subtitle1" sx={{ width: "30%" }}>
						Email
					</Typography>
					<Controller
						name="email"
						control={control}
						render={({ field }) => (
							<TextField
								{...field}
								sx={{ width: "70%" }}
								type="number"
								error={Boolean(errors.email)}
								helperText={errors.email?.message}
							/>
						)}
					/>
				</Box>
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						width: "100%",
					}}
				>
					<Typography variant="subtitle1" sx={{ width: "30%" }}>
						Phone Number
					</Typography>
					<Controller
						name="phone"
						control={control}
						render={({ field }) => (
							<TextField
								{...field}
								sx={{ width: "70%" }}
								type="number"
								error={Boolean(errors.phone)}
								helperText={errors.phone?.message}
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">+91</InputAdornment>
									),
								}}
							/>
						)}
					/>
				</Box>
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						width: "100%",
					}}
				>
					<Typography variant="subtitle1" sx={{ width: "30%" }}>
						Pan Card
						<CustomTooltip text="Privacy Info: This data will be encrypted and stored. It will be visible only to your organisation users who have the required permission." />
					</Typography>
					<Controller
						name="panCard"
						control={control}
						render={({ field }) => (
							<TextField
								{...field}
								sx={{ width: "70%" }}
								type="text"
								error={Boolean(errors.panCard)}
								helperText={errors.panCard?.message}
							/>
						)}
					/>
				</Box>
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						width: "100%",
					}}
				>
					<Typography variant="subtitle1" sx={{ width: "30%" }}>
						GST Number
					</Typography>
					<Controller
						name="gstNumber"
						control={control}
						render={({ field }) => (
							<TextField
								{...field}
								sx={{ width: "70%" }}
								error={Boolean(errors.gstNumber)}
								helperText={errors.gstNumber?.message}
							/>
						)}
					/>
				</Box>
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						width: "100%",
					}}
				>
					<Typography variant="subtitle1" sx={{ width: "30%" }}>
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
								sx={{ width: "70%" }}
								label="Address Line 1"
								error={Boolean(errors.address1)}
								helperText={errors.address1?.message}
								required
							/>
						)}
					/>
				</Box>
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						width: "100%",
					}}
				>
					<Typography variant="subtitle1" sx={{ width: "30%" }}>
						Address Line 2
					</Typography>
					<Controller
						name="address2"
						control={control}
						defaultValue=""
						render={({ field }) => (
							<TextField
								{...field}
								sx={{ width: "70%" }}
								error={Boolean(errors.address2)}
								helperText={errors.address2?.message}
							/>
						)}
					/>
				</Box>
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						width: "100%",
					}}
				>
					<Typography variant="subtitle1" sx={{ width: "30%" }}>
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
								sx={{ width: "70%" }}
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
				</Box>
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
