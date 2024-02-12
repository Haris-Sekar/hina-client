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
import React, { useEffect, useState } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { updateCustomer } from "../../api/services/customer";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import {
	fetchCustomers,
	fetchMainArea,
} from "../../store/Reducers/CustomerReducers";

const EditCustomer = () => {
	const params = useParams();

	const id = params.id as unknown as number;

	const { customers, loading, mainAreas } = useAppSelector(
		(state) => state.customer
	);

	const dispatch = useAppDispatch();

	useEffect(() => {
		if (!customers || (customers.length === 0 && id)) {
			dispatch(fetchCustomers({ customerId: id }));
		}
		if (!mainAreas || (mainAreas.length === 0 && id)) {
			dispatch(fetchMainArea({}));
		}
	}, [dispatch]);

	useEffect(() => {
		setPageLoading(loading);
	}, [loading]);

	const [values, setValues] = useState<Customer>();

	useEffect(() => {
		setValues(getCustomerById(id));
	});

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<Customer>();

	const navigate = useNavigate();

	function useQuery() {
		const { search } = useLocation();

		return React.useMemo(() => new URLSearchParams(search), [search]);
	}

	function getCustomerById(id: number): Customer | undefined {
		return customers.find((customer) => customer.customerId === Number(id));
	}

	const param = useQuery();

	function onSubmit(e: Customer) {
		setIsLoading(true);
		e.customerId = id;
		updateCustomer(e).then((data) => {
			setIsLoading(false);
			navigate("/app/sales/customer");
		});
	}

	const [isLoading, setIsLoading] = useState(false);

	const [pageLoading, setPageLoading] = useState(false);

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
							name="firstName"
							control={control}
							defaultValue={values.firstName}
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
							defaultValue={values.lastName}
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
							defaultValue={values.companyName}
							disabled
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
							defaultValue={values.phoneNumber}
							disabled
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
							defaultValue={values.email}
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
							defaultValue={values.address1}
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
							defaultValue={values.address2}
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
									defaultValue={{
										id: values.mainArea.mainAreaId,
										label: values.mainArea.name,
									}}
									value={{
										id: values.mainArea.mainAreaId,
										label: values.mainArea.name,
									}}
									renderInput={(params) => (
										<TextField
											{...params}
											helperText={errors.mainAreaId?.message}
											error={Boolean(errors.mainAreaId)}
											label="Main Area"
											required
											value={{
												id: values.mainArea.mainAreaId,
												label: values.mainArea.name,
											}}
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
							startIcon={<ModeEditOutlinedIcon />}
						>
							Update
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
			)}
		</Paper>
	);
};
export default EditCustomer;
