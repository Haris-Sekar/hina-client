import * as React from "react";
import { Button, buttonClasses } from "@mui/base/Button";
import { styled } from "@mui/system";
import Stack from "@mui/material/Stack";
import { blue } from "./Colors";
export default function CButton({
  title,
  color,
  disabled,
  icon,
  click = () => {},
}) {
  if (color === undefined) {
    color = blue;
  }

  const CustomButton = styled(Button)`
    font-family: "IBM Plex Sans", sans-serif;
    font-size: 0.875rem;
    line-height: 1.5;
    background-color: ${color[500]};
    color: white;
    border-radius: 8px;
    font-weight: 600;
    padding: 8px 16px;
    cursor: pointer;
    transition: all 150ms ease;
    border: none;

    &:hover:not(:disabled) {
      background-color: ${color[600]};
    }

    &:active:not(:disabled) {
      background-color: ${color[700]};
    }

    &.${buttonClasses.focusVisible} {
      box-shadow: 0 4px 20px 0 rgb(61 71 82 / 0.1),
        0 0 0 5px rgb(0 127 255 / 0.5);
      outline: none;
    }

    &.${buttonClasses.disabled} {
      opacity: 0.5;
      cursor: not-allowed;
    }
  `;
  return (
    <Stack spacing={2} direction="row">
      <CustomButton
        className="flexCenter"
        disabled={disabled}
        onClick={(e) => click()}
      >
        {icon} <span style={{margin: "1px"}}>{title}</span>
      </CustomButton>
    </Stack>
  );
}
