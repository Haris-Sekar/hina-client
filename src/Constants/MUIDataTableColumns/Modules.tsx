/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { getHeader, renderDateAndTime, renderUser } from "../DataTableColumn";
import { IModule } from "../../Types/Module";

import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import ContextMenu, { MenuItem } from "../../components/ContextMenu";
import { updateModule } from "../../api/services/customization";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { fetchModules } from "../../store/Thunks/CustomizationThunks";
import { useAppDispatch } from "../../store/store";
import { fetchUserRoleAndPermissions } from "../../store/Thunks/UserThunks";
const RenderMoreIcon = (e: GridRenderCellParams) => {
  const isActive = e.row.is_active === "ACTIVE";
  const menuItems: MenuItem[][] = [
    [
      {
        key: "edit",
        name: isActive ? "Disable" : "Enable",
        icon: isActive ? (
          <RemoveCircleOutlineIcon />
        ) : (
          <CheckCircleOutlineIcon />
        ),
        color: isActive ? "red" : "green",
        isHidden: false,
        isDisabled: e.row.is_default,
        tooltip: e.row.is_default
          ? "Cannot change status of default module"
          : undefined,
        ...e,
      },
    ],
  ];

  const dispatch = useAppDispatch();

  const changeStatus = async (row: any) => {
    await updateModule(
      row.name,
      row.description ?? "",
      isActive ? false : true,
      row.id
    );
    dispatch(fetchModules({ page: 0, range: 25 }));
    dispatch(fetchUserRoleAndPermissions());
  };

  return (
    <ContextMenu
      menuItems={menuItems}
      onMenuItemClick={(item) => {
        if (item.row) {
          changeStatus(item.row);
        }
      }}
    />
  );
};

const moduleListView: GridColDef[] = [
  {
    field: "id",
    headerName: "ID",
    renderHeader: () => getHeader(""),
    renderCell: (e) => {
      return RenderMoreIcon(e);
    },
    hideable: false,
    hideSortIcons: true,
    sortable: false,
    disableColumnMenu: true,
    resizable: false,
    maxWidth: 60,
  },
  {
    field: "name",
    headerName: "Name",
    minWidth: 200,
    flex: 1,
    renderHeader: () => getHeader("Name"),
  },
  {
    field: "is_active",
    headerName: "Status",
    minWidth: 200,
    flex: 1,
    renderHeader: () => getHeader("Status"),
  },
  {
    field: "created_by",
    headerName: "Created By",
    minWidth: 200,
    flex: 1,
    renderHeader: () => getHeader("Created By"),
    renderCell: (e) => renderUser(e),
  },
  {
    field: "created_time",
    headerName: "Created Time",
    minWidth: 200,
    flex: 1,
    renderHeader: () => getHeader("Created Time"),
    renderCell: (e) => renderDateAndTime(e),
  },
  {
    field: "updated_by",
    headerName: "Updated By",
    minWidth: 200,
    flex: 1,
    renderHeader: () => getHeader("Updated By"),
    renderCell: (e) => renderUser(e),
  },
  {
    field: "updated_time",
    headerName: "Updated Time",
    minWidth: 200,
    flex: 1,
    renderHeader: () => getHeader("Updated Time"),
    renderCell: (e) => renderDateAndTime(e),
  },
];

const moduleListViewRow = (module: IModule) => {
  return {
    id: module.id,
    name: module.name,
    is_active: module.isActive ? "ACTIVE" : "INACTIVE",
    is_default: module.isDefault,
    created_by: module.createdBy,
    created_time: module.createdTime,
    updated_by: module.updatedBy,
    updated_time: module.updatedTime,
  };
};

export { moduleListView, moduleListViewRow };
