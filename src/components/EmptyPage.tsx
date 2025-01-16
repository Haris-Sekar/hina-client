import LoadingButton from "@mui/lab/LoadingButton";
import { Box, Typography } from "@mui/material";

interface IEmptyPage {
	image: any;
	heading: string;
	description: string;
	buttons?: IButton[];
	imageWidth?: string;
	imageHeight?: string;
}

interface IButton {
	label: string;
	onchange?: Function;
	onclick?: Function;
	isLoading?: boolean;
	variant?: "text" | "outlined" | "contained";
	color?:
		| "inherit"
		| "error"
		| "success"
		| "primary"
		| "secondary"
		| "info"
		| "warning";
}

const EmptyPage = (details: IEmptyPage) => {
	document.title = "Page not found";
	return (
		<Box
			sx={{
				display: "flex",
				flexDirection:
					details.buttons && details.buttons.length > 0 ? "row" : "column",
				justifyContent: "center",
				alignContent: "center",
				alignItems: "center",
				gap: "50px",
				height: "100vh",
			}}
		>
			<Box
				sx={{
					display: "flex",
					justifyContent: "center",
					alignContent: "center",
				}}
			>
				<img
					src={details.image}
					alt="asdf"
					width={details.imageWidth || "300px"}
					height={details.imageHeight || "300px"}
				/>
			</Box>
			<Box>
				<Typography
					textAlign={
						details.buttons && details.buttons.length > 0 ? "left" : "center"
					}
					sx={{ fontSize: "40px", fontWeight: "900", mb: "20px" }}
				>
					{details.heading}
				</Typography>
				<Typography
					textAlign={
						details.buttons && details.buttons.length > 0 ? "left" : "center"
					}
					fontSize="20px"
					fontWeight="500"
					maxWidth="500px"
				>
					{details.description}
				</Typography>
				<Box
					sx={{
						display: "flex",
						mt: "20px",
						gap: "20px",
					}}
				>
					{details.buttons &&
						details.buttons.map((button, index) => {
							return (
								<LoadingButton
									key={index}
									loading={button.isLoading}
									variant={button.variant || "contained"}
									color={button.color || "success"}
									onClick={() => button.onclick && button.onclick()}
								>
									{button.label}
								</LoadingButton>
							);
						})}
				</Box>
			</Box>
		</Box>
	);
};

export default EmptyPage;

export type { IEmptyPage, IButton };
