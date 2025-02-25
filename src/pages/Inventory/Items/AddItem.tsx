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
import LoadingButton from "@mui/lab/LoadingButton";
import { useEffect, useRef, useState } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { useNavigate } from "react-router-dom";
import { Item, RateObject } from "../../../Types/Inventory";
import { addItem } from "../../../api/services/inventory";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import {
	fetchItemGroup,
	fetchRateVersion,
	fetchSize,
} from "../../../store/Reducers/InventoryReducerts";
import { v4 as uuidv4 } from "uuid";
const AddItem = () => {
	const {
		control,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<Item>();

	const navigate = useNavigate();

	function onSubmit(e: Item, event: any) { 

		setIsLoading(true);
		const tempRateObject = rateObject;

		tempRateObject.rates.forEach(
			(rate) => (rate.versionId = rateObject.versionId)
		);

		e.rateObject = tempRateObject;
		addItem(e)
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			.then((_data) => {
				setIsLoading(false);
				if (event.nativeEvent.submitter.id !== "saveAndNew") {
					navigate("/app/itemgroup");
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

	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchItemGroup({}));
		dispatch(fetchRateVersion({}));
		dispatch(fetchSize({}));
	}, []);

	const { itemGroup, rateVersion, size } = useAppSelector(
		(state) => state.inventory
	);

	const initalRateObject = {
		versionId: 0,
		rates: [
			{
				uuid: uuidv4(),
				sizeId: 0,
				versionId: 0,
				costPrice: 0,
				sellingPrice: 0,
			},
		],
	};

	const addNewRateRow = () => {
		const tempRateObject = rateObject;

		tempRateObject.rates.push();

		setRateObject({
			versionId: rateObject.versionId,
			rates: [
				...rateObject.rates,
				{
					uuid: uuidv4(),
					sizeId: 0,
					versionId: 0,
					costPrice: 0,
					sellingPrice: 0,
				},
			],
		});
	};
	const removeRateObject = (uuidToRemove: string) => {
		setRateObject((prevRateObject) => ({
			...prevRateObject,
			rates: prevRateObject.rates.filter((rate) => rate.uuid !== uuidToRemove),
		}));
	};

	const [rateObject, setRateObject] = useState<RateObject>(initalRateObject);

	const sizeRef = useRef(null);
	const defaultRateVersion =
		rateVersion.length > 0
			? {
					id: rateVersion?.find((e) => e.isDefault)?.versionId,
					label: rateVersion?.find((e) => e.isDefault)?.name,
			  }
			: null;

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
			<Typography variant="h1">New Item</Typography>
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
						Item Name *
					</Typography>
					<Controller
						name="itemName"
						control={control}
						defaultValue=""
						rules={{
							required: "Item name is required",
						}}
						render={({ field }) => (
							<TextField
								{...field}
								sx={{ width: "80%" }}
								label="name"
								error={Boolean(errors.itemName)}
								helperText={errors.itemName?.message}
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
						HSN Code
					</Typography>
					<Controller
						name="hsnCode"
						control={control}
						render={({ field }) => (
							<TextField
								{...field}
								sx={{ width: "80%" }}
								label="HSN Code"
								error={Boolean(errors.hsnCode)}
								helperText={errors.hsnCode?.message}
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
						Unit
					</Typography>
					<Controller
						name="unit"
						control={control}
						render={({ field }) => (
							<Autocomplete
								{...field}
								disablePortal
								id="combo-box-demo"
								options={["Box", "PCS", "CM", "INCH"]}
								sx={{ width: "80%" }}
								defaultValue="Box"
								onChange={(_event, value) => {
									control._formValues.unit = value;
									console.log(control._formValues.unit);
									return value;
								}}
								renderInput={(params) => (
									<TextField
										{...params}
										helperText={errors.unit?.message}
										label="Unit"
									/>
								)}
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
						Pcs Per Unit
					</Typography>
					<Controller
						name="pcsPerUnit"
						control={control}
						render={({ field }) => (
							<TextField
								{...field}
								sx={{ width: "80%" }}
								label="Pcs Per Unit"
								error={Boolean(errors.pcsPerUnit)}
								helperText={errors.pcsPerUnit?.message}
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
						Item Group *
					</Typography>
					<Controller
						name="itemGroupId.groupId"
						control={control}
						render={({ ...field }) => (
							<Autocomplete
								{...field}
								disablePortal
								id="combo-box-demo"
								options={itemGroup.map((group) => {
									return { id: group.groupId, label: group.name };
								})}
								isOptionEqualToValue={(option, value) => option == value}
								sx={{ width: "80%" }}
								onChange={(_event, value) => {
									control._formValues.itemGroupId = value?.id;
									return value?.id;
								}}
								renderInput={(params) => (
									<TextField
										{...params}
										helperText={errors.itemGroupId?.message}
										label="Item Group"
									/>
								)}
							/>
						)}
					/>
				</Grid>
				<Typography variant="h5" textAlign="center" fontWeight="bold">
					Price
				</Typography>
				<Divider />

				<Grid
					item
					sx={{
						display: "flex",
						alignItems: "center",
						width: "100%",
					}}
				>
					<Typography variant="subtitle1" sx={{ width: "20%" }}>
						Rate Version *
					</Typography>
					{rateVersion.length > 0 && (
						<Controller
							name="rateObject.versionId"
							control={control}
							rules={{
								required: "Rate Version is required",
							}}
							render={({ ...field }) => (
								<Autocomplete
									{...field}
									disablePortal
									id="combo-box-demo"
									options={rateVersion.map((version) => {
										return { id: version.versionId, label: version.name };
									})}
									sx={{ width: "80%" }}
									onChange={(_event, value) => {
										control._formValues.rateObject.versionId = value?.id;
										let tempRateObject: RateObject = rateObject;
										tempRateObject.versionId = Number(value?.id);
										setRateObject(tempRateObject);
										return value?.id;
									}}
									isOptionEqualToValue={(option, value) => option === value}
									defaultValue={defaultRateVersion}
									renderInput={(params) => (
										<TextField
											{...params}
											helperText={errors.rateObject?.versionId?.message}
											error={Boolean(errors.rateObject?.versionId)}
											label="Rate Version"
											required
										/>
									)}
								/>
							)}
						/>
					)}
				</Grid>
				{rateObject.rates.map((rate) => (
					<Grid
						item
						sx={{
							display: "flex",
							alignItems: "center",
							width: "100%",
							gap: "20px",
							justifyContent: "center",
						}}
						key={rate.uuid}
					>
						<Autocomplete
							ref={sizeRef}
							autoFocus
							autoSelect
							autoHighlight
							disablePortal
							id="combo-box-demo"
							options={size.map((s) => {
								return { id: s.sizeId, label: s.size };
							})}
							sx={{ width: "27%" }}
							onChange={(_event, value) => {
								rate.sizeId = Number(value?.id);
								return value?.id;
							}}
							renderInput={(params) => (
								<TextField {...params} label="Size" required />
							)}
							isOptionEqualToValue={(option, value) => option == value}
						/>
						<TextField
							sx={{ width: "27%" }}
							type="number"
							label="Cost Price Per Unit"
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">₹</InputAdornment>
								),
								endAdornment: (
									<InputAdornment position="end">/-</InputAdornment>
								),
							}}
							onChange={(e) => (rate.costPrice = Number(e.currentTarget.value))}
						/>
						<TextField
							sx={{ width: "27%" }}
							label="Selling Price Per Unit"
							type="number"
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">₹</InputAdornment>
								),
								endAdornment: (
									<InputAdornment position="end">/-</InputAdornment>
								),
							}}
							onChange={(e) =>
								(rate.sellingPrice = Number(e.currentTarget.value))
							}
						/>
						{rateObject.rates[rateObject.rates.length - 1].uuid ==
							rate.uuid && (
							<Button variant="contained" onClick={(_e) => addNewRateRow()}>
								Add
							</Button>
						)}

						<Button
							variant="contained"
							color="error"
							onClick={(_e) => removeRateObject(String(rate.uuid))}
							disabled={rateObject.rates.length === 1}
						>
							Remove
						</Button>
					</Grid>
				))}

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
						onClick={() => navigate("/app/itemgroup")}
						endIcon={<CancelIcon />}
					>
						Cancel
					</Button>
				</Box>
			</Box>
		</Paper>
	);
};
export default AddItem;
