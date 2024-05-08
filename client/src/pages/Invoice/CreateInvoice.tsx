import {
	Autocomplete,
	Box,
	Button,
	ButtonGroup,
	CircularProgress,
	FormControl,
	IconButton,
	InputAdornment,
	InputLabel,
	MenuItem,
	Paper,
	Select,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TextField,
	ToggleButton,
	ToggleButtonGroup,
	Typography,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../store/store";
import React, { useEffect, useRef, useState } from "react";
import { fetchCustomers } from "../../store/Reducers/CustomerReducers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import RemoveCircleRoundedIcon from "@mui/icons-material/RemoveCircleRounded";
import dayjs from "dayjs";
import {
	fetchItem,
	fetchRateVersion,
	fetchSize,
} from "../../store/Reducers/InventoryReducerts";
import { Item, Size } from "../../Types/Inventory";
import { currencyFormatter } from "../../Constants/commonFunctions";
import AddBoxIcon from "@mui/icons-material/AddBox";
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";
import DeleteIcon from "@mui/icons-material/Delete";
import { v4 } from "uuid";

const CreateInvoice = () => {
	const { customers, loading } = useAppSelector((state) => state.customer);

	const { itemWithRates, rateVersion } = useAppSelector(
		(state) => state.inventory
	);

	const allSizes = useAppSelector((state) => state.inventory.size);

	const [items, setItems] = useState<Item[]>([]);

	useEffect(() => {
		if (itemWithRates.length > 0) {
			const tempItems: Item[] = [];
			itemWithRates.forEach((a: any) => {
				tempItems.push(a.itemDetails);
			});
			setItems(tempItems);
		}
	}, [itemWithRates]);

	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(
			fetchCustomers({
				page: 0,
				range: 1000,
			})
		);
		dispatch(
			fetchItem({
				page: 0,
				range: 100,
				withRate: true,
			})
		);
		dispatch(fetchRateVersion({}));
		dispatch(fetchSize({}));
	}, []);

	const [selectedItem, setSelectedItem] = useState<Item>();
	const [rateVersionState, setRateVersion] = useState<Number>();
	const [sizes, setSizes] = useState<Size[]>([]);

	useEffect(() => {
		if (rateVersion.length > 0) {
			const defaultRateVersion = rateVersion.filter((e) => e.isDefault)[0]
				.versionId;
			setRateVersion(defaultRateVersion);
		}
	}, [rateVersion]);
	useEffect(() => {
		if (selectedItem && selectedItem?.itemName) {
			const itemDets: any = itemWithRates.find(
				(a: any) => a.itemDetails.itemId === selectedItem.itemId
			);
			const tempSize: Size[] = [];
			if (itemDets && rateVersionState) {
				itemDets.rates[rateVersionState].rates.forEach((e: any) => {
					tempSize.push(e.size);
				});
				setSizes(tempSize);
			}
		}
	}, [selectedItem]);

	interface LineItem {
		uuid: string;
		itemId: number;
		sizeId: number;
		quantity: number;
		rate: number;
		discount: number;
		unit: string;
		pcsPerUnit: number;
		totalPcs: number;
	}

	const initalLineItem: LineItem = {
		uuid: v4(),
		itemId: 0,
		sizeId: 0,
		quantity: 1,
		rate: 0,
		discount: 0,
		pcsPerUnit: 0,
		unit: "Box",
		totalPcs: 1,
	};
	const [currentLineItem, setCurrentLineItem] =
		useState<LineItem>(initalLineItem);

	const getAndSetRates = (sizeId: any) => {
		const itemDets: any = itemWithRates.find(
			(a: any) => a.itemDetails.itemId === currentLineItem.itemId
		);
		const rate = itemDets.rates[rateVersionState]?.rates.filter(
			(e: any) => e.size.sizeId === sizeId
		)[0];
		setCurrentLineItem({
			...currentLineItem,
			sizeId: sizeId,
			rate: rate.sellingPrice,
		});
	};

	useEffect(() => {
		setCurrentLineItem({
			...currentLineItem,
			totalPcs: currentLineItem.quantity * currentLineItem.pcsPerUnit,
		});
	}, [currentLineItem.quantity]);

	const sizeRef = useRef(null);
	const itemRef = useRef(null);

	const [lineItems, setLineItems] = useState<LineItem[]>([]);

	const addLineItem = () => {
		const existingLineItemIndex = lineItems.findIndex(
			(item) =>
				item.itemId === currentLineItem.itemId &&
				item.sizeId === currentLineItem.sizeId
		);

		if (existingLineItemIndex === -1) {
			const tempCurrLineItem = initalLineItem;
			Object.assign(tempCurrLineItem, currentLineItem);
			setLineItems([...lineItems, tempCurrLineItem]);
		} else {
			const existingLineItem = lineItems[existingLineItemIndex];
			const newLineItem = {
				...existingLineItem,
				quantity: existingLineItem.quantity + currentLineItem.quantity,
				totalPcs: existingLineItem.totalPcs + currentLineItem.totalPcs,
				discount: currentLineItem.discount,
			};

			const updatedLineItems = [...lineItems];
			updatedLineItems[existingLineItemIndex] = newLineItem;
			setLineItems(updatedLineItems);
		}
		const item = itemRef.current.getElementsByClassName(
			"MuiAutocomplete-clearIndicator"
		)[0];
		const size = sizeRef.current.getElementsByClassName(
			"MuiAutocomplete-clearIndicator"
		)[0];
		if (size) size.click();
		if (item) item.click();
		setCurrentLineItem(initalLineItem);
		setCurrentLineItem({
			...initalLineItem,
			uuid: v4(),
			rate: 0,
			totalPcs: 0,
			quantity: 1,
		});
		itemRef.current.focus();
	};

	if (!loading) {
		if (itemRef.current) itemRef.current.focus();
	}

	const findItemDetails = (itemId: number) => {
		return items.find((e) => e.itemId === itemId);
	};
	const findSizeDetails = (sizeId: number) => {
		return allSizes.find((e) => e.sizeId === sizeId);
	};

	const [grandDiscountType, setGrandDiscountType] =
		useState<String>("percentage");

	return (
		<>
			<Paper
				sx={{
					display: "flex",
					flexDirection: "column",
					margin: "5%",
					padding: "2%",
					gap: 5,
				}}
			>
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						gap: 5,
					}}
				>
					<span>Customer Name *</span>
					<Autocomplete
						disablePortal
						id="auto-highlight"
						autoHighlight
						autoSelect
						options={customers}
						getOptionLabel={(option) => option.companyName}
						sx={{ width: 500 }}
						autoFocus
						loading={loading}
						renderInput={(params) => (
							<TextField
								{...params}
								required
								placeholder="Select a customer to invoice"
								InputProps={{
									...params.InputProps,
									endAdornment: (
										<React.Fragment>
											{loading ? (
												<CircularProgress color="inherit" size={20} />
											) : null}
											{params.InputProps.endAdornment}
										</React.Fragment>
									),
								}}
							/>
						)}
					/>
				</Box>
				<Box
					sx={{
						display: "flex",
						gap: 5,
					}}
				>
					<Box
						sx={{
							display: "flex",
							alignItems: "center",
							gap: 5,
						}}
					>
						<span>Invoice Number *</span>
						<TextField sx={{ width: 500 }} required disabled value="0001" />
					</Box>

					<Box
						sx={{
							display: "flex",
							alignItems: "center",
							gap: 5,
						}}
					>
						<span>Invoice Date</span>
						<LocalizationProvider dateAdapter={AdapterDayjs}>
							<DemoContainer components={["DatePicker"]}>
								<DatePicker
									label="Invoice Date"
									defaultValue={dayjs()}
									format="DD-MMMM-YYYY"
									disableFuture
								/>
							</DemoContainer>
						</LocalizationProvider>
					</Box>
					<Box
						sx={{
							display: "flex",
							alignItems: "center",
							gap: 5,
							width: "20%",
						}}
					>
						<span style={{ width: "fit-content" }}>Rate Version</span>

						{rateVersionState && (
							<FormControl fullWidth>
								<InputLabel id="demo-simple-select-label">Version</InputLabel>
								<Select
									labelId="demo-simple-select-label"
									id="demo-simple-select"
									value={rateVersionState}
									defaultValue={rateVersionState}
									label="version"
									onChange={(e) => setRateVersion(Number(e.target.value))}
								>
									{rateVersion.map((e) => (
										<MenuItem value={e.versionId} key={e.versionId}>
											{e.name}
										</MenuItem>
									))}
								</Select>
							</FormControl>
						)}
					</Box>
				</Box>
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						gap: 5,
						width: "100%",
					}}
				>
					<Box sx={{ width: "100%" }}>
						<TableContainer component={Paper} sx={{ width: "100%" }}>
							<Table sx={{ width: "100%" }} aria-label="simple table">
								<TableHead>
									<TableRow>
										<TableCell>Item</TableCell>
										<TableCell align="right" sx={{ width: "10%" }}>
											Size
										</TableCell>
										<TableCell align="right" sx={{ width: "10%" }}>
											Quantity({currentLineItem.unit} /{" "}
											{currentLineItem.pcsPerUnit})
										</TableCell>
										<TableCell align="right" sx={{ width: "10%" }}>
											Pcs
										</TableCell>
										<TableCell align="right" sx={{ width: "10%" }}>
											Rate/Pcs
										</TableCell>
										<TableCell align="right" sx={{ width: "10%" }}>
											Total Amount
										</TableCell>
										<TableCell align="right" sx={{ width: "10%" }}>
											Discount
										</TableCell>
										<TableCell align="right" sx={{ width: "10%" }}>
											Net Rate
										</TableCell>
										<TableCell align="right" sx={{ width: "3%" }}></TableCell>
										<TableCell align="right" sx={{ width: "3%" }}></TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									<TableRow>
										<TableCell>
											<Autocomplete
												disablePortal
												id="auto-highlight"
												ref={itemRef}
												autoHighlight
												options={items}
												getOptionLabel={(option) => option.itemName}
												isOptionEqualToValue={(option, value) =>
													option == value
												}
												autoFocus
												autoSelect
												loading={loading}
												renderInput={(params) => (
													<TextField
														{...params}
														required
														placeholder="Items"
														InputProps={{
															...params.InputProps,
															endAdornment: (
																<React.Fragment>
																	{loading ? (
																		<CircularProgress
																			color="inherit"
																			size={20}
																		/>
																	) : null}
																	{params.InputProps.endAdornment}
																</React.Fragment>
															),
														}}
													/>
												)}
												onChange={(_e: any, itemDetails: Item | any) => {
													if (itemDetails) {
														setSelectedItem(itemDetails);
														setCurrentLineItem({
															...currentLineItem,
															itemId: itemDetails.itemId,
															unit: itemDetails.unit,
															pcsPerUnit: itemDetails.pcsPerUnit,
															totalPcs: itemDetails.pcsPerUnit * 1,
															rate: 0,
															sizeId: 0,
														});
														const ele = sizeRef.current.getElementsByClassName(
															"MuiAutocomplete-clearIndicator"
														)[0];
														if (ele) ele.click();
													}
												}}
											/>
										</TableCell>
										<TableCell sx={{ width: "10%" }}>
											<Autocomplete
												ref={sizeRef}
												disablePortal
												id="auto-highlight"
												autoHighlight
												options={sizes}
												autoFocus
												autoSelect
												getOptionLabel={(option) => option.size}
												isOptionEqualToValue={(option, value) =>
													option == value
												}
												renderInput={(params) => (
													<TextField {...params} required placeholder="Sizes" />
												)}
												onChange={(_e: any, size: Size | any) => {
													if (size) {
														getAndSetRates(size.sizeId);
													}
												}}
											/>
										</TableCell>
										<TableCell align="center" sx={{ width: "10%" }}>
											<TextField
												type="number"
												value={currentLineItem.quantity}
												onChange={(e) => {
													setCurrentLineItem({
														...currentLineItem,
														quantity: Number(e.target.value),
													});
												}}
												InputProps={{
													value: currentLineItem.quantity,
													inputProps: {
														style: {
															textAlign: "center",
														},
													},
													startAdornment: (
														<InputAdornment position="start">
															<IconButton
																edge="start"
																onClick={() =>
																	setCurrentLineItem({
																		...currentLineItem,
																		quantity: ++currentLineItem.quantity,
																	})
																}
															>
																<AddCircleRoundedIcon
																	color="primary"
																	fontSize="large"
																/>
															</IconButton>
														</InputAdornment>
													),
													endAdornment: (
														<InputAdornment position="end">
															<IconButton
																edge="end"
																onClick={() =>
																	currentLineItem.quantity > 1 &&
																	setCurrentLineItem({
																		...currentLineItem,
																		quantity: --currentLineItem.quantity,
																	})
																}
															>
																<RemoveCircleRoundedIcon
																	color="primary"
																	fontSize="large"
																/>
															</IconButton>
														</InputAdornment>
													),
												}}
											/>
										</TableCell>
										<TableCell align="right" sx={{ width: "10%" }}>
											<TextField
												type="number"
												value={currentLineItem.totalPcs}
												onChange={(e) => {
													setCurrentLineItem({
														...currentLineItem,
														totalPcs: Number(e.target.value),
													});
												}}
											/>
										</TableCell>
										<TableCell align="right" sx={{ width: "10%" }}>
											<TextField
												value={currentLineItem.rate}
												onChange={(e) =>
													setCurrentLineItem({
														...currentLineItem,
														rate: Number(e.target.value),
													})
												}
												InputProps={{
													startAdornment: (
														<span style={{ paddingRight: "10%" }}>₹</span>
													),
												}}
											/>
										</TableCell>
										<TableCell
											align="right"
											sx={{ width: "10%", fontWeight: "bolder" }}
										>
											{currencyFormatter(
												currentLineItem.rate * currentLineItem.totalPcs
											)}
										</TableCell>
										<TableCell align="right" sx={{ width: "10%" }}>
											<TextField
												type="number"
												InputProps={{
													endAdornment: "%",
												}}
												onKeyDown={(event) => {
													if (event.keyCode === 13) {
														addLineItem();
													}
												}}
												onChange={(e) => {
													setCurrentLineItem({
														...currentLineItem,
														discount: Number(e.target.value),
													});
												}}
											/>
										</TableCell>
										<TableCell
											align="right"
											sx={{ width: "10%", fontWeight: "bolder" }}
										>
											{currencyFormatter(
												currentLineItem.rate * currentLineItem.totalPcs -
													(currentLineItem.rate *
														currentLineItem.totalPcs *
														currentLineItem.discount) /
														100
											)}
										</TableCell>
										<TableCell align="right" sx={{ width: "3%" }}>
											<Button
												variant="contained"
												startIcon={<AddBoxIcon />}
												onClick={(_e) => addLineItem()}
											>
												Add
											</Button>
										</TableCell>
										<TableCell align="right" sx={{ width: "3%" }}>
											<Button
												variant="contained"
												startIcon={<DisabledByDefaultIcon />}
											>
												Clear
											</Button>
										</TableCell>
									</TableRow>
									{lineItems.map((lineItem) => (
										<TableRow>
											<TableCell>
												{findItemDetails(lineItem.itemId)?.itemName}
											</TableCell>
											<TableCell align="right">
												{findSizeDetails(lineItem.sizeId)?.size}
											</TableCell>
											<TableCell align="right">{lineItem.quantity}</TableCell>
											<TableCell align="right">{lineItem.totalPcs}</TableCell>
											<TableCell align="right">
												{currencyFormatter(lineItem.rate)}
											</TableCell>
											<TableCell align="right">
												{currencyFormatter(lineItem.rate * lineItem.totalPcs)}
											</TableCell>
											<TableCell align="right">{lineItem.discount}</TableCell>
											<TableCell align="right">
												{currencyFormatter(
													lineItem.rate * lineItem.totalPcs -
														(lineItem.rate *
															lineItem.totalPcs *
															lineItem.discount) /
															100
												)}
											</TableCell>
											<TableCell>
												<Button
													color="error"
													onClick={(_e) => {
														setLineItems((prefItem) =>
															prefItem.filter(
																(item) => item.uuid !== lineItem.uuid
															)
														);
													}}
												>
													<DeleteIcon />
												</Button>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</TableContainer>
						<Box
							sx={{
								width: "100%",
								mt: "2%",
								display: "flex",
								alignItems: "end",
								justifyContent: "space-between",
							}}
						>
							<Box
								sx={{
									width: "50%",
									display: "flex",
									alignItems: "end",
								}}
							>
								asdf
							</Box>
							<Box
								sx={{
									width: "30%",
									display: "flex",
									justifyContent: "end",
									backgroundColor: "#f7f7fa",
									margin: "1%",
									borderRadius: "10px",
									height: "100%",
								}}
							>
								<Table>
									<TableBody>
										<TableRow>
											<TableCell sx={{ fontWeight: "bold", fontSize: "17px" }}>
												Sub Total
											</TableCell>
											<TableCell
												sx={{ fontWeight: "bolder", fontSize: "17px" }}
											>
												{currencyFormatter(500)}
											</TableCell>
										</TableRow>
										<TableRow>
											<TableCell>
												<TableCell sx={{ borderBottom: 0 }}>Discount</TableCell>
												<TableCell sx={{ borderBottom: 0, display: "flex" }}>
													<TextField
														InputProps={{
															style: {
																height: "50px",
															},
														}}
													/>
													<Paper
														elevation={0}
														sx={{
															display: "flex",
															border: (theme) =>
																`1px solid ${theme.palette.divider}`,
															flexWrap: "wrap",
															padding: "1%",
															height: "50px",
														}}
													>
														<ToggleButtonGroup
															value={grandDiscountType}
															exclusive
															onChange={(_e, value) =>
																setGrandDiscountType(value)
															}
															aria-label="text alignment"
															sx={{ width: "fit-content", height: "100%" }}
														>
															<ToggleButton
																sx={{ fontWeight: "bolder", fontSize: "17px" }}
																value="rupees"
															>
																₹
															</ToggleButton>
															<ToggleButton
																sx={{ fontWeight: "bolder", fontSize: "17px" }}
																value="percentage"
															>
																%
															</ToggleButton>
														</ToggleButtonGroup>
													</Paper>
												</TableCell>
											</TableCell>

											<TableCell>908</TableCell>
										</TableRow>
										<TableRow>
											<TableCell>Tax</TableCell>
											<TableCell></TableCell>
										</TableRow>
										<TableRow>
											<TableCell>Discount</TableCell>
											<TableCell></TableCell>
										</TableRow>
									</TableBody>
								</Table>
							</Box>
						</Box>
					</Box>
				</Box>
			</Paper>
		</>
	);
};

export default CreateInvoice;
