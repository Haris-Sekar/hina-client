/* eslint-disable @typescript-eslint/ban-types */
import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { IDialogBox } from "../Types/Form";
import { Checkbox, FormControlLabel } from "@mui/material";

export default function DialogBox({
	dialogDetails,
	open,
	setOpen,
	successCallBack,
}: {
	dialogDetails: IDialogBox;
	open: boolean;
	setOpen: Function;
	successCallBack: Function;
}) {
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

	const handleClose = () => {
		setBtnDisabled(dialogDetails.needCheckbox);
		setOpen(false);
	};

	const [btnDisabled, setBtnDisabled] = React.useState(
		dialogDetails.needCheckbox
	);

	return (
		<React.Fragment>
			<Dialog
				fullScreen={fullScreen}
				open={open}
				onClose={handleClose}
				aria-labelledby="responsive-dialog-title"
			>
				<DialogTitle id="responsive-dialog-title">
					{dialogDetails.title}
				</DialogTitle>
				<DialogContent>
					<DialogContentText>{dialogDetails.description}</DialogContentText>
					{dialogDetails.needCheckbox && (
						<FormControlLabel
							sx={{ mt: "10px", userSelect: "none", cursor: "pointer" }}
							control={<Checkbox />}
							label={dialogDetails.checkboxContent}
							onChange={() => setBtnDisabled(!btnDisabled)}
						/>
					)}
				</DialogContent>
				<DialogActions>
					<Button
						variant="outlined"
						color="error"
						onClick={(e) => {
							setBtnDisabled(dialogDetails.needCheckbox);
							successCallBack(e, dialogDetails.id);
						}}
						autoFocus
						disabled={btnDisabled}
					>
						{dialogDetails.successBtnText}
					</Button>
					<Button variant="outlined" autoFocus onClick={handleClose}>
						{dialogDetails.failureBtnText}
					</Button>
				</DialogActions>
			</Dialog>
		</React.Fragment>
	);
}
