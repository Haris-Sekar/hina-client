import EmptyPage, { IButton } from "../../components/EmptyPage";
import email from "../../assets/email.png";
import { useEffect, useState } from "react";
import {
	getUserDetailsForVerification,
	verifyUser,
} from "../../api/services/auth";
import invalid from "../../assets/forbidden.png";
import { Box, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
const Verify = () => {
	const navigate = useNavigate();

	const url = new URL(window.location.href);
	const token = url.searchParams.get("token");
	useEffect(() => {
		if (token) {
			verifyToken(token);
		}
	}, []);

	const [isLoading, setIsLoading] = useState(false);

	const [isError, setIsError] = useState(token === null);

	const [userName, setUserName] = useState("");

	const verifyToken = async (token: string) => {
		try {
			setIsLoading(true);
			const response = await getUserDetailsForVerification(token);
			if (response) {
				setUserName(response.id.first_name + " " + response.id.last_name);
			} else {
				setIsError(true);
			}
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};

	const buttons: IButton[] = [
		{
			label: "Verify",
			onclick: async () => {
				if (token) {
					await verifyUser(token);
					navigate("/auth");
				}
			},
			variant: "contained",
			color: "primary",
		},
		{
			label: "Home",
			onclick: () => {
				navigate("/");
			},
			variant: "outlined",
			color: "error",
		},
	];

	const errorButtons: IButton[] = [
		{
			label: "Send Email Again",
			onclick: () => {},
			variant: "contained",
			color: "primary",
		},
		{
			label: "Home",
			onclick: () => {
				navigate("/");
			},
			variant: "outlined",
			color: "error",
		},
	];

	return (
		<>
			{!isError ? (
				isLoading ? (
					<Box
						sx={{
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							height: "100vh",
						}}
					>
						<CircularProgress />
					</Box>
				) : (
					<EmptyPage
						heading="Account Confirmation"
						description={`Hi ${userName}, Please confirm your Hina account today by clicking the button below.`}
						image={email}
						imageWidth="100px"
						imageHeight="100px"
						buttons={buttons}
					/>
				)
			) : (
				<EmptyPage
					heading="Invalid Link"
					description="The link you followed may be broken or has expired. Please request a new one to proceed."
					image={invalid}
					imageWidth="150px"
					imageHeight="150px"
					buttons={errorButtons}
				/>
			)}
		</>
	);
};

export default Verify;
