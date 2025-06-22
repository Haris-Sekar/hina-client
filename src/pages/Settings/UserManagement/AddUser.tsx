/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Controller, useForm } from "react-hook-form";
import { User } from "../../../Types/User";
import {
	Box,
	Button,
	MenuItem,
	Select,
	TextField,
	Typography,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useEffect, useState } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { fetchRoles, fetchUsers } from "../../../store/Reducers/UserReducers";
import { inviteUser } from "../../../api/services/user";
const AddUser = () => {
	const navigate = useNavigate();

	const {
		control,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<User>();

	const onSubmit = async (e: User) => {
		setIsLoading(true);

		try {
			await inviteUser(e);
			navigate("/app/settings/users");
			dispatch(fetchUsers({ page: 0, range: 25 }));
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};

	const onError = () => {};

	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchRoles({ page: 0, range: 100 }));
	}, [dispatch]);

	const [isLoading, setIsLoading] = useState(false);

	const { roles } = useAppSelector((state) => state.user);

	const status = [
		{
			id: "ACTIVE",
			name: "Active",
		},
		{
			id: "INACTIVE",
			name: "Inactive",
		},
		{
			id: "SUSPENDED",
			name: "Suspended",
		},
		{
			id: "READ_ONLY",
			name: "Read Only",
		},
	];

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
			<Box
				sx={{
					flexGrow: 1,
				}}
			>
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
						Invite Users
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
							Name
						</Typography>
						<Box
							sx={{
								width: "50%",
								display: "flex",
								gap: "20px",
							}}
						>
							<Controller
								name="firstName"
								control={control}
								defaultValue=""
								rules={{
									required: "First name is required",
								}}
								render={({ field }) => (
									<TextField
										{...field}
										sx={{ width: "50%" }}
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
										sx={{ width: "50%" }}
										label="Last Name"
										error={Boolean(errors.lastName)}
										helperText={errors.lastName?.message}
									/>
								)}
							/>
						</Box>
					</Box>
					<Box
						sx={{
							display: "flex",
							alignItems: "center",
							width: "100%",
						}}
					>
						<Typography variant="subtitle1" sx={{ width: "30%" }}>
							Email *
						</Typography>
						<Controller
							name="email"
							control={control}
							defaultValue=""
							rules={{
								required: "Email is required",
							}}
							render={({ field }) => (
								<TextField
									{...field}
									sx={{ width: "50%" }}
									type="email"
									label="Email"
									error={Boolean(errors.email)}
									helperText={errors.email?.message}
									required
								/>
							)}
						/>
					</Box>
					{roles.length > 0 && (
						<Box
							sx={{
								display: "flex",
								alignItems: "center",
								width: "100%",
							}}
						>
							<Typography variant="subtitle1" sx={{ width: "30%" }}>
								Role
							</Typography>
							<Controller
								name="roleId"
								control={control}
								defaultValue={
									roles.find((role) => role.name === "Employee")?.id
								}
								render={({ field }) => (
									<Select
										sx={{ width: "50%" }}
										{...field}
										value={field.value ?? ""}
										error={Boolean(errors.role)}
										onChange={(e) => {
											field.onChange(e.target.value);
										}}
									>
										{roles.map((role) => {
											return (
												<MenuItem key={role.id} value={role.id}>
													{role.name}
												</MenuItem>
											);
										})}
									</Select>
								)}
							/>
						</Box>
					)}
					<Box
						sx={{
							display: "flex",
							alignItems: "center",
							width: "100%",
						}}
					>
						<Typography variant="subtitle1" sx={{ width: "30%" }}>
							Status
						</Typography>
						<Controller
							name="status"
							control={control}
							render={({ field }) => (
								<Select
									sx={{ width: "50%" }}
									{...field}
									error={Boolean(errors.status)}
									onChange={(_e, value: any) => {
										setValue("status", value?.props?.value);
									}}
									defaultValue={"ACTIVE"}
								>
									{status.map((status) => {
										return (
											<MenuItem key={status.id} value={status.id}>
												{status.name}
											</MenuItem>
										);
									})}
								</Select>
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
					startIcon={<AddCircleIcon />}
					id="saveAndClose"
				>
					Invite Users
				</LoadingButton>
				<Button
					variant="contained"
					color="error"
					sx={{ mt: 3, mb: 2, width: "fit-content" }}
					endIcon={<CancelIcon />}
					onClick={() => navigate("/app/settings/users")}
				>
					Cancel
				</Button>
			</Box>
		</Box>
	);
};

export default AddUser;
