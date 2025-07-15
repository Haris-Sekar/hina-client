/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import ListView from "./ListView";
import { GridColDef } from "@mui/x-data-grid";
import { useState } from "react";
interface IModulePage {
  moduleName: string;
  rows: any;
  columns: GridColDef[];
  isLoading: boolean;
  isServerPagination: boolean;
  onPaginationModelChange?: Function;
  rowCount?: number;
  addCallBack: () => void;
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
  inlineEditCallback?: (
    newRow: any,
    oldRow: any,
    params: any
  ) => Promise<any> | any;
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
  rowOnClick,
  isServerSideSort,
  onSortModelChange,
  columnVisibilityModel,
  checkboxSelection,
  hasBulkEdit,
  hasBulkDelete,
  hasAdd = true,
  inlineEditCallback,
}: IModulePage) => {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  function onRowSelect(ids: number[]) {
    setSelectedIds(ids);
  }

  function onBulkEdit() {
    if (selectedIds.length > 0) {
      editCallBack(selectedIds);
    }
  }

  function onBulkDelete() {
    if (selectedIds.length > 0) {
      deleteCallBack(selectedIds);
    }
  }

  return (
    <div style={{ height: "100%" }}>
      <ListView
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
        inlineEditCallback={inlineEditCallback}
        toolBarProps={{
          moduleName: moduleName,
          showAddButton: hasAdd,
          showBulkEdit: hasBulkEdit,
          showBulkDelete: hasBulkDelete,
          addCallBack: addCallBack,
          editCallBack: onBulkEdit,
          deleteCallBack: onBulkDelete,
        }}
      />
    </div>
  );
};

export default ModulePage;
