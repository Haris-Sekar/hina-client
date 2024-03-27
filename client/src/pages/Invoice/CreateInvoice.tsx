import {
	Autocomplete,
	Box,
	FormControl,
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
import { useEffect, useState } from "react";
import { fetchCustomers } from "../../store/Reducers/CustomerReducers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import {
	fetchItem,
	fetchRateVersion,
} from "../../store/Reducers/InventoryReducerts";
import { Item, Size } from "../../Types/Inventory";
import { editingStateInitializer } from "@mui/x-data-grid/internals";

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

	console.log(sizes);

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
										<TableCell align="right">Size</TableCell>
										<TableCell align="right">Quantity</TableCell>
										<TableCell align="right">Rate</TableCell>
										<TableCell align="right">Discount</TableCell>
										<TableCell align="right">Net Rate</TableCell>
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
												isOptionEqualToValue
												autoFocus
												autoSelect
												loading={loading}
												renderInput={(params) => (
													<TextField {...params} required placeholder="Items" />
												)}
												onChange={(_e: any, itemDetails: Item | any) =>
													setSelectedItem(itemDetails)
												}
											/>
										</TableCell>
										<TableCell>
											<Autocomplete
												disablePortal
												id="auto-highlight"
												autoHighlight
												options={sizes}
												getOptionLabel={(option) => option.size}
												autoFocus
												loading={loading}
												renderInput={(params) => (
													<TextField {...params} required placeholder="Sizes" />
												)}
											/>
										</TableCell>
										<TableCell>
											<Autocomplete
												disablePortal
												id="auto-highlight"
												autoHighlight
												options={items}
												getOptionLabel={(option) => option.itemName}
												autoFocus
												loading={loading}
												renderInput={(params) => (
													<TextField {...params} required placeholder="Items" />
												)}
											/>
										</TableCell>
										<TableCell>
											<Autocomplete
												disablePortal
												id="auto-highlight"
												autoHighlight
												options={items}
												getOptionLabel={(option) => option.itemName}
												autoFocus
												loading={loading}
												renderInput={(params) => (
													<TextField {...params} required placeholder="Items" />
												)}
											/>
										</TableCell>
										<TableCell>
											<Autocomplete
												disablePortal
												id="auto-highlight"
												autoHighlight
												options={items}
												getOptionLabel={(option) => option.itemName}
												autoFocus
												loading={loading}
												renderInput={(params) => (
													<TextField {...params} required placeholder="Items" />
												)}
											/>
										</TableCell>
										<TableCell>
											<Autocomplete
												disablePortal
												id="auto-highlight"
												autoHighlight
												options={items}
												getOptionLabel={(option) => option.itemName}
												autoFocus
												loading={loading}
												renderInput={(params) => (
													<TextField {...params} required placeholder="Items" />
												)}
											/>
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
