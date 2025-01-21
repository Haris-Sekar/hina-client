/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
	Tab,
	Tabs,
	TextField,
	Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { Customer } from "../../Types/Customer";
import CustomTooltip from "../../components/Tooltip";
import LoadingButton from "@mui/lab/LoadingButton";
import React, { useState } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { addCustomer } from "../../api/services/customer";
import { useNavigate } from "react-router-dom";
import CountryAndState from "../../Constants/CountryAndState";

const AddCustomer = () => {
	const {
		control,
		handleSubmit,
		reset,
		formState: { errors },
		setValue,
	} = useForm<Customer>();

	const navigate = useNavigate();

	function onSubmit(e: Customer, event: any) {
		setIsLoading(true);
		addCustomer(e)
			.then(() => {
				setIsLoading(false);
				if (event.nativeEvent.submitter.id !== "saveAndNew") {
					navigate("/app/sales/customer");
				} else {
					reset();
				}
			})
			.catch(() => {
				setIsLoading(false);
			});
	}

	const [isLoading, setIsLoading] = useState(false);

	const [tabValue, setTabValueChange] = useState(0);

	function tabAllyProps(index: number) {
		return {
			id: `tab-${index}`,
			"aria-controls": `tabpanel-${index}`,
		};
	}

	const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
		setTabValueChange(newValue);
	};

	interface TabPanelProps {
		children?: React.ReactNode;
		index: number;
		value: number;
	}

	function CustomTabPanel(props: TabPanelProps) {
		const { children, value, index, ...other } = props;

		return (
			<div
				role="tabpanel"
				hidden={value !== index}
				id={`simple-tabpanel-${index}`}
				aria-labelledby={`simple-tab-${index}`}
				{...other}
			>
				{value === index && <Box sx={{ p: 3 }}>{children}</Box>}
			</div>
		);
	}

	function onError() {}

	const countries: string[] = CountryAndState.map((country) => {
		return country.name;
	});

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
								slotProps={{
									input: {
										startAdornment: (
											<InputAdornment position="start">+91</InputAdornment>
										),
									},
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
						GST Number
					</Typography>
					<Controller
						name="taxNumber"
						control={control}
						render={({ field }) => (
							<TextField
								{...field}
								sx={{ width: "70%" }}
								error={Boolean(errors.taxNumber)}
								helperText={errors.taxNumber?.message}
							/>
						)}
					/>
				</Box>
			</Box>
			<Divider sx={{ mt: 5, mb: 2 }} />
			<Box>
				<Tabs value={tabValue} onChange={handleTabChange}>
					<Tab label="Other details" {...tabAllyProps(0)} />
					<Tab label="Address" {...tabAllyProps(1)} />
				</Tabs>

				<CustomTabPanel value={tabValue} index={0}>
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
							mt: 3,
						}}
					>
						<Typography variant="subtitle1" sx={{ width: "30%" }}>
							Opening Balance
						</Typography>
						<Controller
							name="openingBalance"
							control={control}
							defaultValue=""
							render={({ field }) => (
								<TextField
									{...field}
									sx={{ width: "70%" }}
									type="number"
									error={Boolean(errors.openingBalance)}
									helperText={errors.openingBalance?.message}
									slotProps={{
										input: {
											startAdornment: (
												<InputAdornment position="start">
													&#8377;
												</InputAdornment>
											),
										},
									}}
								/>
							)}
						/>
					</Box>
					<Box></Box>
				</CustomTabPanel>

				<CustomTabPanel value={tabValue} index={1}>
					<Box
						sx={{
							display: "flex",
							gap: 5,
						}}
					>
						<Box
							sx={{
								display: "flex",
								flexDirection: "column",
								width: "90%",
								gap: 2,
							}}
						>
							<Typography variant="h6">Billing Address</Typography>
							<Controller
								name="billingAddress.addressLine1"
								control={control}
								defaultValue=""
								render={({ field }) => (
									<TextField
										{...field}
										fullWidth
										label="Address Line 1"
										error={Boolean(errors.billingAddress?.addressLine1)}
										helperText={errors.billingAddress?.addressLine1?.message}
									/>
								)}
							/>
							<Controller
								name="billingAddress.addressLine2"
								control={control}
								defaultValue=""
								render={({ field }) => (
									<TextField
										{...field}
										fullWidth
										label="Address Line 2"
										error={Boolean(errors.billingAddress?.addressLine2)}
										helperText={errors.billingAddress?.addressLine2?.message}
									/>
								)}
							/>
							<Controller
								name="billingAddress.country"
								control={control}
								defaultValue=""
								render={({ field }) => {
									return (
										<Autocomplete
											{...field}
											id="country-select-demo"
											fullWidth
											options={countries}
											autoHighlight
											getOptionLabel={(option) => option}
											renderOption={(props, option) => {
												const { key, ...optionProps } = props;
												return (
													<Box
														key={key}
														component="li"
														sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
														{...optionProps}
													>
														{option}
													</Box>
												);
											}}
											onChange={(_e, value: string | null) => {
												setValue("billingAddress.country", value || "");
											}}
											renderInput={(params) => (
												<TextField
													{...params}
													label="Country"
													slotProps={{
														htmlInput: {
															...params.inputProps,
														},
													}}
												/>
											)}
										/>
									);
								}}
							/>
							<Controller
								name="billingAddress.state"
								control={control}
								defaultValue=""
								render={({ field }) => {
									return (
										<TextField
											{...field}
											fullWidth
											label="State"
											error={Boolean(errors.billingAddress?.state)}
											helperText={errors.billingAddress?.state?.message}
										/>
									);
								}}
							/>
							<Controller
								name="billingAddress.city"
								control={control}
								defaultValue=""
								render={({ field }) => (
									<TextField
										{...field}
										fullWidth
										label="City"
										error={Boolean(errors.billingAddress?.city)}
										helperText={errors.billingAddress?.city?.message}
									/>
								)}
							/>
							<Controller
								name="billingAddress.zipCode"
								control={control}
								defaultValue=""
								render={({ field }) => (
									<TextField
										{...field}
										fullWidth
										label="Zip Code"
										error={Boolean(errors.billingAddress?.zipCode)}
										helperText={errors.billingAddress?.zipCode?.message}
									/>
								)}
							/>
						</Box>
						<Box
							sx={{
								display: "flex",
								flexDirection: "column",
								width: "90%",
								gap: 2,
							}}
						>
							<Typography
								variant="h6"
								sx={{
									display: "flex",
									alignItems: "center",
								}}
							>
								Shipping Address{" "}
								<span
									style={{
										fontSize: "13px",
										cursor: "pointer",
										color: "var(--mui-palette-primary-main)",
									}}
									color="primary"
									onClick={() => {
										setValue(
											"shippingAddress",
											control._formValues.billingAddress
										);
									}}
								>
									&nbsp;(Copy Billing Address)
								</span>
							</Typography>
							<Controller
								name="shippingAddress.addressLine1"
								control={control}
								defaultValue=""
								render={({ field }) => (
									<TextField
										{...field}
										fullWidth
										label="Address Line 1"
										error={Boolean(errors.shippingAddress?.addressLine1)}
										helperText={errors.shippingAddress?.addressLine1?.message}
									/>
								)}
							/>
							<Controller
								name="shippingAddress.addressLine2"
								control={control}
								defaultValue=""
								render={({ field }) => (
									<TextField
										{...field}
										fullWidth
										label="Address Line 2"
										error={Boolean(errors.shippingAddress?.addressLine2)}
										helperText={errors.shippingAddress?.addressLine2?.message}
									/>
								)}
							/>
							<Controller
								name="shippingAddress.country"
								control={control}
								defaultValue=""
								render={({ field }) => {
									return (
										<Autocomplete
											{...field}
											id="country-select-demo"
											fullWidth
											options={countries}
											autoHighlight
											getOptionLabel={(option) => option}
											renderOption={(props, option) => {
												const { key, ...optionProps } = props;
												return (
													<Box
														key={key}
														component="li"
														sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
														{...optionProps}
													>
														{option}
													</Box>
												);
											}}
											onChange={(_e, value: string | null) => {
												setValue("shippingAddress.country", value || "");
											}}
											renderInput={(params) => (
												<TextField
													{...params}
													label="Country"
													slotProps={{
														htmlInput: {
															...params.inputProps,
														},
													}}
												/>
											)}
										/>
									);
								}}
							/>
							<Controller
								name="shippingAddress.state"
								control={control}
								defaultValue=""
								render={({ field }) => {
									return (
										<TextField
											{...field}
											fullWidth
											label="State"
											error={Boolean(errors.shippingAddress?.state)}
											helperText={errors.shippingAddress?.state?.message}
										/>
									);
								}}
							/>
							<Controller
								name="shippingAddress.city"
								control={control}
								defaultValue=""
								render={({ field }) => (
									<TextField
										{...field}
										fullWidth
										label="City"
										error={Boolean(errors.shippingAddress?.city)}
										helperText={errors.shippingAddress?.city?.message}
									/>
								)}
							/>
							<Controller
								name="shippingAddress.zipCode"
								control={control}
								defaultValue=""
								render={({ field }) => (
									<TextField
										{...field}
										fullWidth
										label="Zip Code"
										error={Boolean(errors.shippingAddress?.zipCode)}
										helperText={errors.shippingAddress?.zipCode?.message}
									/>
								)}
							/>
						</Box>
					</Box>
				</CustomTabPanel>
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
		</Paper>
	);
};
export default AddCustomer;
``;
