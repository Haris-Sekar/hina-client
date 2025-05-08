/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Grid, Paper, TextField, Typography } from "@mui/material";
import Logo from "../../components/Logo";
import { Controller, useForm } from "react-hook-form";
import { Company } from "../../Types/Company";
import { useEffect, useState } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import "../Auth/Auth.css";
import { createCompany } from "../../api/services/auth";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../store/store";

const CreateOrganizations = () => {
	const {
		control,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm<Company>();

	const [isLoading, setIsLoading] = useState(false);

	const navigate = useNavigate();

	const { currentUserDetails, companyDetails } = useAppSelector(
		(state) => state.user
	);

	useEffect(() => {
		if (currentUserDetails) {
			if (companyDetails) {
				navigate("/app/dashboard");
			} else {
				navigate("/app/organization/new");
			}
		}
	}, [currentUserDetails, companyDetails]);

	const onSubmit = async (e: Company) => {
		const validateGst = (gst: any) => {
			return gst.match(
				/^[0-9]{2}[A-Z0-9]{5}[0-9]{4}[A-Z]{1}[0-9A-Z]{1}Z[0-9A-Z]{1}$/
			);
		};
		if (!validateGst(e.gstNumber)) {
			setError("gstNumber", {
				type: "minLength",
				message: "Enter an valid GST Number",
			});
			return;
		}

		try {
			setIsLoading(true);
			await createCompany(e);
			navigate("/");
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};
	const onError = () => { };

	return (
		<Box
			height="100vh"
			sx={{ alignItems: "center", justifyContent: "center" }}
			display="flex"
		>
			<Paper className="authContainer" sx={{ borderRadius: 10 }} elevation={4}>
				<div className="logo">
					<Logo />
				</div>
				<Box
					component="form"
					noValidate
					onSubmit={handleSubmit(onSubmit, onError)}
					sx={{
						mt: 3,
						width: "60%",
						display: "flex",
						flexDirection: "column",
						gap: "20px",
					}}
				>
					<Typography
						sx={{
							m: 1,
							textAlign: "center",
							fontSize: "25px",
							fontWeight: 700,
						}}
					>
						Create your Hina Organization today!
					</Typography>
					<Grid item>
						<Controller
							name="name"
							control={control}
							defaultValue=""
							rules={{
								required: "Company Name is required",
							}}
							render={({ field }) => (
								<TextField
									fullWidth
									{...field}
									label="Company Name *"
									error={Boolean(errors.name)}
									helperText={errors.name?.message}
								/>
							)}
						/>
					</Grid>
					<Grid item>
						<Controller
							name="description"
							control={control}
							defaultValue=""
							render={({ field }) => (
								<TextField {...field} label="Description" fullWidth />
							)}
						/>
					</Grid>
					<Grid item>
						<Controller
							name="gstNumber"
							control={control}
							defaultValue=""
							rules={{
								required: "Gst Number is required",
							}}
							render={({ field }) => (
								<TextField
									{...field}
									label="GST Number *"
									fullWidth
									error={Boolean(errors.gstNumber)}
									helperText={
										errors.gstNumber?.message ||
										"Enter your 15-digit GSTIN (Goods and Services Tax Identification Number)."
									}
									autoComplete="given-name"
								/>
							)}
						/>
					</Grid>
					<LoadingButton
						type="submit"
						fullWidth
						variant="contained"
						sx={{ mt: 3, mb: 2 }}
						loading={isLoading}
					>
						{"Create Organization"}
					</LoadingButton>
				</Box>
			</Paper>
		</Box>
	);
};
export default CreateOrganizations;
