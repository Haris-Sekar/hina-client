import HelpIcon from "@mui/icons-material/Help";
import { Tooltip, Zoom } from "@mui/material";

const CustomTooltip = ({ text }: { text: string }) => {
	return (
		<Tooltip title={text} arrow TransitionComponent={Zoom}>
			<HelpIcon sx={{ fontSize: 17, ml: "5px" }} />
		</Tooltip>
	);
};
export default CustomTooltip;
