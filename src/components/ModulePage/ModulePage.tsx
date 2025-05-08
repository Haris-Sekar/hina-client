/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import { Box, Button, Typography } from "@mui/material";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import ListView from "./ListView";
import { GridColDef } from "@mui/x-data-grid";
import { useState } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import SearchBar from "../SearchBar";
interface IModulePage {
  moduleName: string;
  rows: any;
  columns: GridColDef[];
  isLoading: boolean;
  isServerPagination: boolean;
  onPaginationModelChange?: Function;
  rowCount?: number;
  addCallBack: Function;
  editCallBack: Function;
  deleteCallBack: Function;
  deleteBtnLoading?: boolean;
  rowOnClick?: Function;
  isModal?: boolean;
  isServerSideSort?: boolean;
  onSortModelChange?: Function;
  columnVisibilityModel?: Record<string, boolean>;
  checkboxSelection?: boolean;
  hasBulkEdit?: boolean;
  hasBulkDelete?: boolean;
  hasAdd?: boolean;
  showSearch?: boolean;
  onSearch: (value: string) => Promise<any> 
}

const ModulePage = ({
  moduleName,
  rows,
  columns,
  isLoading,
  onPaginationModelChange,
  rowCount,
  editCallBack,
  deleteCallBack,
  addCallBack,
  isServerPagination,
  deleteBtnLoading,
  rowOnClick,
  isModal = false,
  isServerSideSort,
  onSortModelChange,
  columnVisibilityModel,
  checkboxSelection,
  hasBulkEdit,
  hasBulkDelete,
  hasAdd = true,
  showSearch = false,
  onSearch, 
}: IModulePage) => {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  function onRowSelect(ids: number[]) {
    setSelectedIds(ids);
  }

  const toolBar = () => {
    if (!(hasBulkDelete || hasBulkEdit || hasAdd)) {
      return null;
    }

    return (
      <Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h1"
            sx={{ fontSize: "25px", textAlign: "start", width: "20%" }}
          >
            {moduleName}
          </Typography>
          {showSearch && (
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "end",
                paddingRight: "10px",
              }}
            >
              <SearchBar
                onSearch={onSearch}
                placeholder={`Search ${moduleName}...`} 
              />
            </Box>
          )}
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            padding: "10px",
          }}
        >
          <div>
            {selectedIds.length > 0 && (
              <Box sx={{ display: "flex", gap: "10px" }}>
                {hasBulkEdit && (
                  <Button
                    startIcon={<ModeEditOutlineOutlinedIcon />}
                    variant="contained"
                    onClick={() => editCallBack(selectedIds)}
                  >
                    Edit {!isModal && moduleName}
                  </Button>
                )}
                {hasBulkDelete && (
                  <LoadingButton
                    variant="contained"
                    color="error"
                    endIcon={<DeleteForeverOutlinedIcon />}
                    onClick={() => deleteCallBack(selectedIds)}
                    loading={deleteBtnLoading}
                  >
                    Delete {!isModal && moduleName}
                  </LoadingButton>
                )}
              </Box>
            )}
          </div>
          {hasAdd && (
            <Button
              variant="contained"
              sx={{ width: "fit-content" }}
              startIcon={<AddCircleOutlinedIcon />}
              onClick={(e) => addCallBack(e)}
            >
              Add {!isModal && moduleName}
            </Button>
          )}
        </Box>
      </Box>
    );
  };

  return (
    <div style={{ height: "100%" }}>
      <ListView
        toolBar={toolBar}
        rows={rows}
        columns={columns}
        isLoading={isLoading}
        onPaginationModelChange={onPaginationModelChange}
        rowCount={rowCount}
        onRowSelect={onRowSelect}
        isServerPagination={isServerPagination}
        rowOnClick={rowOnClick}
        isServerSideSort={isServerSideSort}
        onSortModelChange={onSortModelChange}
        columnVisibilityModel={columnVisibilityModel}
        checkboxSelection={checkboxSelection}
      />
    </div>
  );
};

export default ModulePage;
