import { Box, Button, Checkbox, TextField, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import LoadingButton from "@mui/lab/LoadingButton";
import { useEffect, useState } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate, useParams } from "react-router-dom";
import { RateVersion } from "../../../Types/Inventory";
import { updateRateVersion } from "../../../api/services/inventory";
import { useAppDispatch } from "../../../store/store";
import { fetchRateVersion } from "../../../store/Thunks/InventoryThunks";

const EditRateVersion = () => {
	const {
		control,
		handleSubmit,
		reset,
		setFocus,
		formState: { errors },
	} = useForm<RateVersion>();

	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const [isLoading, setIsLoading] = useState(false);

	const { id } = useParams();

	useEffect(() => {
		setFocus("name");
	}, [setFocus]);

	useEffect(() => {
		if (!id) return;
		// fetch single rate version using existing thunk pattern
		dispatch(
			// fetchRateVersion expects page & range; pass id as filter
			// @ts-ignore
			fetchRateVersion({ page: 0, range: 25, id: Number(id) })
		).then((res: any) => {
			const items = res?.payload?.rateVersions || [];
			if (items.length > 0) {
				const rv: RateVersion = items[0];
				reset({
					id: rv.id,
					name: rv.name,
					isDefault: rv.isDefault,
					isActive: rv.isActive,
				});
			}
		});
	}, [id, dispatch, reset]);

	function onSubmit(data: RateVersion) {
		setIsLoading(true);
		// call update when editing
		updateRateVersion(data)
			.then(() => {
				setIsLoading(false);
				dispatch(fetchRateVersion({ page: 0, range: 25 }));
				navigate(-1);
			})
			.catch(() => {
				setIsLoading(false);
			});
	}

	function onError() {}

	return (
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
			<Box sx={{ flexGrow: 1 }}>
				<Box
					sx={{
						p: "10px",
						position: "sticky",
						top: 0,
						backgroundColor: "background.paper",
						paddingLeft: 2,
						borderBottom: "1px solid",
						borderColor: "divider",
						zIndex: 999,
					}}
				>
					<Typography sx={{ fontSize: "20px", fontWeight: "bolder" }}>
						Edit Rate Version
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
							Version Name *
						</Typography>
						<Controller
							name="name"
							control={control}
							defaultValue=""
							rules={{
								required: "Size name is required",
							}}
							render={({ field }) => (
								<TextField
									{...field}
									sx={{ width: "40%" }}
									error={Boolean(errors.name)}
									helperText={errors.name?.message}
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
							Is Default
						</Typography>
						<Controller
							name="isDefault"
							control={control}
							render={({ field }) => (
								<Checkbox checked={field.value} {...field} />
							)}
						/>
					</Box>
				</Box>
			</Box>
			<Box
				sx={{
					display: "flex",
					gap: "2%",
					position: "sticky",
					bottom: 0,
					backgroundColor: "background.paper",
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
					startIcon={<EditIcon />}
					id="saveAndClose"
				>
					Save
				</LoadingButton>
				<Button
					variant="contained"
					color="error"
					sx={{ mt: 3, mb: 2, width: "fit-content" }}
					onClick={() => navigate(-1)}
					endIcon={<CancelIcon />}
				>
					Cancel
				</Button>
			</Box>
		</Box>
	);
};

export default EditRateVersion;
