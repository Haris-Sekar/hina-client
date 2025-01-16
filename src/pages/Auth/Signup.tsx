import {
	Box,
	Grid,
	IconButton,
	InputAdornment,
	Paper,
	TextField,
	Typography,
} from "@mui/material";
import Logo from "../../components/Logo";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import { IAuthSignup } from "../../Types/User";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LoadingButton from "@mui/lab/LoadingButton";
import { Link } from "react-router-dom";
import { signup } from "../../api/services/auth";
import EmptyPage from "../../components/EmptyPage";
import email from "../../assets/sent-mail.gif";

const Signup = () => {
	const {
		control,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm<IAuthSignup>();
	const [isLoading, setIsLoading] = useState(false);

	const onSubmit = async (e: IAuthSignup) => {
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
			setError("email", {
				type: "minLength",
				message: "Enter an valid email address",
			});
		}

		try {
			const { data } = await signup(e);

			console.log(data);
			setIsLoading(false);
			if (data.status === "success") {
				setShowEmailSent(true);
			}
		} catch (error) {
			console.log(error);
			setIsLoading(false);
		}
	};

	const onError = () => {};
	const [showPassword, setShowPassword] = useState(false);

	const handleClickShowPassword = () => {
		setShowPassword((show) => !show);
	};

	const [showEmailSent, setShowEmailSent] = useState(false);

	return (
		<Box
			height="100vh"
			sx={{ alignItems: "center", justifyContent: "center" }}
			display="flex"
		>
			{showEmailSent ? (
				<EmptyPage
					image={email}
					description="We’ve sent a verification link to your registered email address. Please verify your email to activate your account and get started!"
					heading="Complete Your Signup"
				/>
			) : (
				<Paper
					className="authContainer"
					sx={{ borderRadius: 10 }}
					elevation={4}
				>
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
								fontSize: "15px",
								fontWeight: 500,
							}}
						>
							Create your Hina Account today!
						</Typography>
						<Grid item sx={{ display: "flex", gap: "20px" }}>
							<Controller
								name="firstName"
								control={control}
								defaultValue=""
								rules={{
									required: "First Name is required",
								}}
								render={({ field }) => (
									<TextField
										sx={{ width: "50%" }}
										{...field}
										label="First Name"
										error={Boolean(errors.firstName)}
										helperText={errors.firstName?.message}
										autoComplete="given-name"
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
										autoComplete="given-name"
									/>
								)}
							/>
						</Grid>
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
						<Grid sx={{ display: "flex", justifyContent: "space-between" }}>
							<Box textAlign="start" sx={{ display: "flex", gap: "5px" }}>
								<Typography>Already have an account?</Typography>
								<Link
									color="primary"
									to="/auth"
									style={{
										textDecoration: "underline",
										fontWeight: "bolder",
										color: "var(--mui-palette-primary-main)",
									}}
								>
									Login now
								</Link>
							</Box>
						</Grid>
						<LoadingButton
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
							loading={isLoading}
						>
							{"Sign Up"}
						</LoadingButton>
					</Box>
				</Paper>
			)}
		</Box>
	);
};

export default Signup;
