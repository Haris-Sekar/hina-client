import { Controller, useForm } from "react-hook-form";
import { IAuthLogin, User } from "../../Types/User";
import LoadingButton from "@mui/lab/LoadingButton";

import { Box } from "@mui/system";
import {
	Grid,
	Paper,
	TextField,
	Typography,
	InputAdornment,
	IconButton,
} from "@mui/material";
import "./Auth.css";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Logo from "../../components/Logo";
import React, { useEffect, useState } from "react";
import { login } from "../../api/services/auth";
import { useAppDispatch } from "../../store/store";
import {
	populateCompanyDetails,
	populateCurrentUserDetails,
} from "../../store/Reducers/UserReducers";
import { Company } from "../../Types/Company";
import {
	companyDetailsConst,
	token,
	userDetailsConst,
} from "../../Constants/CommonConstants";
import { useNavigate } from "react-router-dom";
const Auth = () => {
	const {
		control,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm<IAuthLogin>();
	const [isLoading, setIsLoading] = useState(false);

	const dispatch = useAppDispatch();

	const navigate = useNavigate();
	const jwtToken = localStorage.getItem(token);
	useEffect(() => {
		if (jwtToken) {
			navigate("/app");
		}
	}, [navigate]);

	async function onSubmit(e: IAuthLogin) {
		setIsLoading(true);
		if (e.password.length < 6) {
			setError("password", {
				type: "minLength",
				message: "Passsword length should be greated than 6",
			});
		}
		const validateEmail = (email: any) => {
			return email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
		};
		if (!validateEmail(e.email)) {
			console.log("asdf");
			setError("email", {
				type: "minLength",
				message: "Enter an valid email address",
			});
		}
		try {
			const { data } = await login(e);
			const userDetails: User = data.userDetails as User;
			userDetails.loggedOnTime = Date.now();
			dispatch(populateCurrentUserDetails(userDetails));
			dispatch(populateCompanyDetails(data.companies as Company));
			localStorage.setItem(token, data.jwt_token);
			localStorage.setItem(userDetailsConst, JSON.stringify(userDetails));
			localStorage.setItem(companyDetailsConst, JSON.stringify(data.companies));
			setIsLoading(false);
		} catch (error) {
			setIsLoading(false);
		}
	}

	function onError() {}
	const [showPassword, setShowPassword] = React.useState(false);

	const handleClickShowPassword = () => {
		setShowPassword((show) => !show);
	};

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
				<Typography
					variant="h5"
					sx={{ mt: 5, fontWeight: "bold" }}
					color="primary"
				>
					Hi, Welcome back!
				</Typography>
				<hr style={{ width: "50%" }} />
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
							fontSize: "15px",
							fontWeight: 500,
						}}
					>
						Sign in with your email
					</Typography>
					<Grid item>
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
									label="Email"
									fullWidth
									error={Boolean(errors.email)}
									helperText={errors.email?.message}
									autoComplete="given-name"
								/>
							)}
						/>
					</Grid>
					<Grid item>
						<Controller
							name="password"
							control={control}
							defaultValue=""
							rules={{
								required: "Password is required",
							}}
							render={({ field }) => (
								<TextField
									{...field}
									label="Password"
									fullWidth
									error={Boolean(errors.password)}
									helperText={errors.password?.message}
									autoComplete="given-name"
									type={showPassword ? "text" : "password"}
									InputProps={{
										endAdornment: (
											<InputAdornment position="end">
												<IconButton
													aria-label="toggle password visibility"
													onClick={handleClickShowPassword}
													edge="end"
												>
													{!showPassword ? <VisibilityOff /> : <Visibility />}
												</IconButton>
											</InputAdornment>
										),
									}}
								/>
							)}
						/>
					</Grid>
					<Typography
						color="primary"
						fontWeight="bold"
						textAlign="end"
						sx={{ textDecoration: "underline", cursor: "pointer" }}
					>
						Forgot Password
					</Typography>
					<LoadingButton
						type="submit"
						fullWidth
						variant="contained"
						sx={{ mt: 3, mb: 2 }}
						loading={isLoading}
					>
						{"Sign In"}
					</LoadingButton>
				</Box>
			</Paper>
		</Box>
	);
};

export default Auth;
