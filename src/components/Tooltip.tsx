import HelpIcon from "@mui/icons-material/Help";
import { Tooltip } from "@mui/material";
import React, { ReactNode } from "react";

const CustomTooltip = ({
  text,
  content,
}: {
  text?: string;
  content?: ReactNode;
}) => {
  return (
    <Tooltip
      title={content ? <React.Fragment>{content}</React.Fragment> : text}
      arrow
    >
      <HelpIcon sx={{ fontSize: 20, ml: "5px" }} />
    </Tooltip>
  );
};
export default CustomTooltip;
