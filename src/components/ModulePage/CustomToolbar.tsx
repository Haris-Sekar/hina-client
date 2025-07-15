import {
  Button,
  Divider,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { Toolbar, useGridApiContext } from "@mui/x-data-grid";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import { GridToolbarProps } from "@mui/x-data-grid/internals";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
declare module "@mui/x-data-grid" {
  interface ToolbarPropsOverrides {
    moduleName?: string;
    showAddButton?: boolean;
    showBulkEdit?: boolean;
    showBulkDelete?: boolean;
    showBackButton?: boolean;
    addCallBack?: () => void;
    editCallBack?: () => void;
    deleteCallBack?: () => void;
  }
}

type ToolbarProps = GridToolbarProps & {
  moduleName?: string;
  showAddButton?: boolean;
  showBulkEdit?: boolean;
  showBulkDelete?: boolean;
  showBackButton?: boolean;
  addCallBack?: () => void;
  editCallBack?: () => void;
  deleteCallBack?: () => void;
};

function CustomToolbar({
  moduleName,
  showAddButton,
  addCallBack,
  showBulkEdit,
  showBulkDelete,
  showBackButton,
  editCallBack,
  deleteCallBack,
}: ToolbarProps) {
  const api = useGridApiContext();

  const [isBulkCheckboxSelected, setIsBulkCheckboxSelected] = useState(false);

  api.current.subscribeEvent("headerSelectionCheckboxChange", (params) => {
    setIsBulkCheckboxSelected(params.value);
  });

  api.current.subscribeEvent("rowSelectionCheckboxChange", (params) => {
    setIsBulkCheckboxSelected(params.value);
  });

  const navigate = useNavigate();

  return (
    <Toolbar>
      {showBackButton && (
        <Tooltip title="Back" arrow>
          <IconButton onClick={() => navigate(-1)}>
            <ArrowBackOutlinedIcon />
          </IconButton>
        </Tooltip>
      )}

      <Typography
        fontWeight="bolder"
        sx={{ flex: 1, mx: 0.5, fontSize: "1.5rem" }}
      >
        {moduleName}
      </Typography>
      {isBulkCheckboxSelected && (
        <>
          {showBulkEdit && editCallBack && (
            <Button
              variant="contained"
              sx={{ width: "fit-content" }}
              startIcon={<AddCircleOutlineIcon />}
              onClick={() => editCallBack()}
            >
              Edit {moduleName}
            </Button>
          )}
          {showBulkDelete && deleteCallBack && (
            <Button
              variant="contained"
              color="error"
              sx={{ width: "fit-content", ml: 1 }}
              onClick={() => deleteCallBack()}
            >
              Delete {moduleName}
            </Button>
          )}
        </>
      )}

      <Divider
        orientation="vertical"
        variant="middle"
        flexItem
        sx={{ mx: 0.5 }}
      />
      {showAddButton && addCallBack && (
        <Button
          variant="contained"
          sx={{ width: "fit-content" }}
          startIcon={<AddCircleOutlineIcon />}
          onClick={addCallBack}
        >
          Add {moduleName}
        </Button>
      )}
    </Toolbar>
  );
}

export default CustomToolbar;
