import {
	Autocomplete,
	Box,
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
} from "../../store/Reducers/InventoryReducerts";
import { Item, Size } from "../../Types/Inventory";

const CreateInvoice = () => {
	const { customers, loading } = useAppSelector((state) => state.customer);

	const { itemWithRates, rateVersion } = useAppSelector(
		(state) => state.inventory
	);

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
		const rate = itemDets.rates[rateVersionState].rates.filter(
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
	const autoC = useRef(null);

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
											Rate
										</TableCell>
										<TableCell align="right" sx={{ width: "10%" }}>
											Discount
										</TableCell>
										<TableCell align="right" sx={{ width: "10%" }}>
											Net Rate
										</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									<TableRow>
										<TableCell>
											<Autocomplete
												disablePortal
												id="auto-highlight"
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
													const ele = autoC.current.getElementsByClassName(
														"MuiAutocomplete-clearIndicator"
													)[0];
													if (ele) ele.click();
												}}
											/>
										</TableCell>
										<TableCell sx={{ width: "10%" }}>
											<Autocomplete
												ref={autoC}
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
										<TableCell align="right" sx={{ width: "10%" }}>
											<TextField
												type="number"
												InputProps={{
													endAdornment: "%",
												}}
											/>
										</TableCell>
										<TableCell align="right" sx={{ width: "10%" }}>
											Net Rate
										</TableCell>
									</TableRow>
								</TableBody>
							</Table>
						</TableContainer>
					</Box>
				</Box>
			</Paper>
		</>
	);
};

export default CreateInvoice;
