/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
import {
	Autocomplete,
	Box,
	Button,
	Checkbox,
	CircularProgress,
	Dialog,
	Divider,
	FormControlLabel,
	InputAdornment,
	MenuItem,
	Radio,
	RadioGroup,
	Select,
	Tab,
	Tabs,
	TextField,
	Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import { Customer, PaymentTerm } from "../../Types/Customer";
import CustomTooltip from "../../components/Tooltip";
import LoadingButton from "@mui/lab/LoadingButton";
import React, { useEffect, useState } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import {
	addPaymentTerms,
	deletePaymentTerms,
	updateCustomer,
	updatePaymentTerms,
} from "../../api/services/customer";
import { useNavigate, useParams } from "react-router-dom";
import CountryAndState from "../../Constants/CountryAndState";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { useAppDispatch, useAppSelector } from "../../store/store";
import {
	fetchCustomers,
	fetchPaymentTerms,
} from "../../store/Reducers/CustomerReducers";
import ModulePage from "../../components/ModulePage/ModulePage";
import { paymentTermsColDef } from "../../Constants/DataTableColumn";
import DialogBox from "../../components/DialogBox";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

const EditCustomer = () => {
	const navigate = useNavigate();

	const dispatch = useAppDispatch();

	const params = useParams();

	const id = params.id as unknown as number;

	useEffect(() => {
		dispatch(fetchPaymentTerms({}));
		dispatch(fetchCustomers({ customerId: id }));
	}, [dispatch]);

	const { paymentTerms, customers, loading } = useAppSelector(
		(state) => state.customer
	);


	const {
		control,
		handleSubmit,
		reset,
		formState: { errors },
		setValue,
	} = useForm<Customer>();

	if (customers.length > 0) {
		const customer = customers.find((c) => c.id === Number(id));
		if (customer) {
			setValue("customerName", customer?.customerName);
			setValue("customerCode", customer.customerCode);
			setValue("customerType", customer.customerType);
			setValue("phone", customer.phone);
			setValue("email", customer.email);
			setValue("taxNumber", customer.taxNumber);
			setValue("panCard", customer.panCard);
			setValue("openingBalance", customer.openingBalance);
			setValue("paymentTerms", customer.paymentTerms);
			setValue("billingAddress", customer.billingAddress);
			setValue("shippingAddress", customer.shippingAddress);
		}
	}

	function onSubmit(e: Customer, event: any) { 
		e.id = id;
		setIsLoading(true); 
		updateCustomer(e)
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

	function onError() { }

	const countries: string[] = CountryAndState.map((country) => {
		return country.name;
	});

	const [openPayTerm, setOpenPayTerm] = useState(false);

	const paymentTermsRow: PaymentTerm[] =
		paymentTerms.length > 0 ? paymentTerms : [];

	const [addOpenModal, setAddOpenModal] = useState(false);
	const [paymentTermsState, setPaymentTermsState] = useState<
		PaymentTerm | undefined
	>();
	const [isEditPaymentTerm, setIsEditPaymentTerm] = useState(false);
	const createCallback = async () => {
		if (paymentTermsState) {
			if (
				paymentTermsState &&
				paymentTermsState.name.length > 0 &&
				paymentTermsState.numberOfDays &&
				paymentTermsState.numberOfDays > 0
			) {
				if (isEditPaymentTerm) {
					await updatePaymentTerms(paymentTermsState);
				} else {
					await addPaymentTerms(paymentTermsState);
				}
				dispatch(fetchPaymentTerms({}));
				setAddOpenModal(false);
				setPaymentTermsState(undefined);
			}
		}
	};

	const [openAlertBox, setOpenAlertBox] = useState(false);

	const [deleteIds, setDeleteIds] = useState<number[]>([]);

	const handleCopyShippingAddress = () => {
		const address = control._formValues.billingAddress;
		setValue("shippingAddress.addressLine1", address?.addressLine1);
		setValue("shippingAddress.addressLine2", address?.addressLine2);
		setValue("shippingAddress.city", address?.city);
		setValue("shippingAddress.state", address?.state);
		setValue("shippingAddress.zipCode", address?.zipCode);
		setValue("shippingAddress.country", address?.country);
	};

	return (
		<>
			{loading ? (
				<CircularProgress
					sx={{ height: "100%", width: "100%", margin: "auto" }}
				/>
			) : (
				<Box
					component="form"
					noValidate
					onSubmit={handleSubmit(onSubmit, onError)}
					sx={{
						display: "flex",
						flexDirection: "column",
						width: "100%",
						height: "100%",
					}}
				>
					<Box
						sx={{
							flexGrow: 1,
							width: "100%",
						}}
					>
						<Dialog
							open={openPayTerm}
							onClose={() => {
								setOpenPayTerm(false);
							}}
							fullWidth
						>
							<DialogBox
								dialogDetails={{
									id: "delete",
									title: "Delete Payment Terms",
									description: (
										<Typography>
											Are you sure you want to delete those payment terms?
										</Typography>
									),
									failureBtnText: "cancel",
									successBtnText: "Delete",
								}}
								open={openAlertBox}
								setOpen={setOpenAlertBox}
								successCallBack={async () => {
									await deletePaymentTerms(deleteIds);
									setOpenAlertBox(false);
									dispatch(fetchPaymentTerms({}));
								}}
							/>
							<ModulePage
								moduleName="Payment Terms"
								columns={paymentTermsColDef}
								isLoading={false}
								isServerPagination={false}
								rows={paymentTermsRow}
								addCallBack={() => {
									setIsEditPaymentTerm(false);
									setAddOpenModal(true);
								}}
								deleteCallBack={(e: number[]) => {
									setDeleteIds(e);
									setOpenAlertBox(true);
								}}
								editCallBack={(e: any) => {
									const paymentTerm = paymentTerms.find(
										(term) => term.id === e[0]
									);
									setPaymentTermsState(paymentTerm);
									setIsEditPaymentTerm(true);
									setAddOpenModal(true);
								}}
								isModal={true}
							/>
						</Dialog>
						<Dialog
							open={addOpenModal}
							onClose={() => {
								setAddOpenModal(false);
								setPaymentTermsState(undefined);
							}}
							fullWidth
						>
							<Box
								sx={{
									padding: "20px",
								}}
							>
								<Typography
									sx={{
										fontSize: "24px",
										fontWeight: 900,
										mb: "10px",
									}}
								>
									{isEditPaymentTerm ? "Edit" : "Add"} Payment Term
								</Typography>
								<Divider />
								<Box
									sx={{ display: "flex", flexDirection: "row", gap: 1, mt: 2 }}
								>
									<TextField
										required
										label="Term Name"
										value={paymentTermsState?.name}
										onChange={(e) =>
											setPaymentTermsState({
												id: paymentTermsState?.id,
												numberOfDays: paymentTermsState?.numberOfDays,
												name: e.currentTarget.value,
												isDefault: paymentTermsState?.isDefault || false,
											})
										}
									/>
									<TextField
										label="Number of Days"
										error={
											(paymentTermsState?.name &&
												paymentTermsState?.name.length > 0) ||
											false
										}
										required
										value={paymentTermsState?.numberOfDays}
										type="number"
										onChange={(e) =>
											setPaymentTermsState({
												id: paymentTermsState?.id,
												numberOfDays: Number(e.currentTarget.value),
												name: paymentTermsState?.name || "",
												isDefault: paymentTermsState?.isDefault || false,
											})
										}
									/>
								</Box>
								<Box sx={{ mt: 1 }}>
									<FormControlLabel
										control={
											<Checkbox
												value={paymentTermsState?.isDefault}
												onChange={(e) =>
													setPaymentTermsState({
														id: paymentTermsState?.id,
														numberOfDays: paymentTermsState?.numberOfDays,
														name: paymentTermsState?.name || "",
														isDefault: e.currentTarget.checked,
													})
												}
												checked={paymentTermsState?.isDefault}
											/>
										}
										label="Is Default"
									/>
								</Box>

								<LoadingButton
									type="button"
									variant="contained"
									sx={{ mt: 2 }}
									onClick={() => createCallback()}
									startIcon={
										isEditPaymentTerm ? (
											<ModeEditOutlineOutlinedIcon />
										) : (
											<AddCircleIcon />
										)
									}
								>
									{isEditPaymentTerm ? "Edit" : "Add"}
								</LoadingButton>
								<LoadingButton
									type="button"
									color="error"
									variant="outlined"
									sx={{ mt: 2, ml: 2 }}
									onClick={() => {
										setPaymentTermsState(undefined);
										setAddOpenModal(false);
									}}
									endIcon={<CancelIcon />}
								>
									Close
								</LoadingButton>
							</Box>
						</Dialog>
						<Box
							sx={{
								p: "10px",
								position: "sticky",
								top: 0,
								backgroundColor: "background.paper", // or your theme's background color
								paddingLeft: 2,
								borderBottom: "1px solid",
								borderColor: "divider",
								zIndex: 999,
							}}
						>
							<Typography sx={{ fontSize: "20px", fontWeight: "bolder" }}>
								Edit Customer
							</Typography>
						</Box>
						<Box
							sx={{
								display: "flex",
								flexDirection: "column",
								gap: "20px",
								mt: 3,
								padding: "2%",
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
									<CustomTooltip text="Customer Name will be used to bill customer under this name" />
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
											sx={{ width: "40%" }}
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
											sx={{ width: "40%" }}
											type="email"
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
											sx={{ width: "40%" }}
											type="number"
											error={Boolean(errors.phone)}
											helperText={errors.phone?.message}
											slotProps={{
												input: {
													startAdornment: (
														<InputAdornment position="start">
															+91
														</InputAdornment>
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
											sx={{ width: "40%" }}
											error={Boolean(errors.taxNumber)}
											helperText={errors.taxNumber?.message}
										/>
									)}
								/>
							</Box>
						</Box>
						<Box>
							<Tabs
								value={tabValue}
								onChange={handleTabChange}
								sx={{ borderBottom: "2px solid var(--mui-palette-divider)" }}
							>
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
												sx={{ width: "40%" }}
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
										Payment Terms
									</Typography>
									<Controller
										name="paymentTerms"
										control={control}
										render={({ field }) => (
											<Box
												sx={{
													width: "40%",
													display: "flex",
													alignItems: "center",
													gap: "10px",
												}}
											>
												<Select
													sx={{ width: "80%" }}
													{...field}
													error={Boolean(errors.openingBalance)}
													onChange={(_e, value: any) => {
														setValue("paymentTerms", value?.props?.value);
													}}
												>
													{paymentTerms.map((term) => {
														return (
															<MenuItem key={term.id} value={term.id}>
																{term.name}
															</MenuItem>
														);
													})}
												</Select>
												<Button
													sx={{
														height: "50px",
														width: "20%",
														minWidth: "120px",
													}}
													variant="contained"
													color="secondary"
													startIcon={<SettingsOutlinedIcon />}
													onClick={() => setOpenPayTerm(true)}
												>
													Manage
												</Button>
											</Box>
										)}
									/>
								</Box>
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
											width: "40%",
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
													helperText={
														errors.billingAddress?.addressLine1?.message
													}
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
													helperText={
														errors.billingAddress?.addressLine2?.message
													}
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
											width: "40%",
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
													handleCopyShippingAddress();
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
													helperText={
														errors.shippingAddress?.addressLine1?.message
													}
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
													helperText={
														errors.shippingAddress?.addressLine2?.message
													}
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
					</Box>
					<Box
						sx={{
							display: "flex",
							gap: "2%",
							position: "sticky",
							bottom: 0,
							backgroundColor: "background.paper", // or your theme's background color
							paddingLeft: 2,
							borderTop: "1px solid",
							borderColor: "divider",
							zIndex: 999,
						}}
					>
						<LoadingButton
							type="submit"
							variant="contained"
							sx={{ mt: 3, mb: 2, width: "fit-content" }}
							loading={isLoading}
							startIcon={<EditOutlinedIcon />}
							id="saveAndClose"
						>
							Edit And Close
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
		</>
	);
};
export default EditCustomer;
