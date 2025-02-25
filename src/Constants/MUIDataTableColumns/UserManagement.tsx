import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";

import { Permission, Role } from "../../Types/User";
import { getHeader } from "../DataTableColumn";
import { Checkbox } from "@mui/material";

const roleColumn: GridColDef[] = [
    {
        field: "id",
        headerName: "ID",
        flex: 1,
    },
    {
        field: "name",
        headerName: "Name",
        minWidth: 200,
        flex: 1,
    },
    {
        field: "description",
        headerName: "Description",
        minWidth: 200,
        flex: 1,
    },
    {
        field: "createdTime",
        headerName: "Created Time",
        minWidth: 200,
        flex: 1,

    },
    {
        field: "updatedTime",
        headerName: "Updated Time",
        minWidth: 200,
        flex: 1,
    },
    {
        field: "createdBy",
        headerName: "Created By",
        minWidth: 200,
        flex: 1,
    },
    {
        field: "updatedBy",
        headerName: "Updated By",
        minWidth: 200,
        flex: 1,
    }
]


const roleListViewRow = (role: Role) => {
    return {
        id: role.id,
        name: role.name,
        description: role.description,
        createdTime: role.createdTime,
        updatedTime: role.updatedTime,
        createdBy: role.createdBy,
        updatedBy: role.updatedBy
    }
}

const renderCheckbox = (e: GridRenderCellParams) => { return (<Checkbox checked={e.value} disabled={e.row.role.is_system_added} />) }

const rolePermissionColumns: GridColDef[] = [
    {
        field: "module",
        headerName: "Module",
        minWidth: 200,
        flex: 1,
        renderHeader: () => getHeader("Module"),
        renderCell: (e) => {
            return <>{e.value.name}</>
        },
        sortable: false,
        disableColumnMenu: true
    },
    {
        field: "read",
        headerName: "Read",
        maxWidth: 150,
        flex: 1,
        renderHeader: () => getHeader("Read"),
        sortable: false,
        disableColumnMenu: true,
        renderCell: renderCheckbox
    },
    {
        field: "create",
        headerName: "Create",
        maxWidth: 150,
        minWidth: 30,
        flex: 1,
        renderHeader: () => getHeader("Create"),
        sortable: false,
        disableColumnMenu: true,
        renderCell: renderCheckbox
    },
    {
        field: "update",
        headerName: "Update",
        maxWidth: 150,
        minWidth: 30,
        flex: 1,
        renderHeader: () => getHeader("Update"),
        sortable: false,
        disableColumnMenu: true,
        renderCell: renderCheckbox
    },
    {
        field: "delete",
        headerName: "Delete",
        maxWidth: 150,
        minWidth: 30,
        flex: 1,
        renderHeader: () => getHeader("Delete"),
        sortable: false,
        disableColumnMenu: true,
        renderCell: renderCheckbox
    },
    {
        field: "read_all",
        maxWidth: 150,
        headerName: "Read All",
        minWidth: 30,
        flex: 1,
        renderHeader: () => getHeader("Read All"),
        sortable: false,
        disableColumnMenu: true,
        renderCell: renderCheckbox
    },
    {
        field: "update_all",
        maxWidth: 150,
        headerName: "Update All",
        minWidth: 30,
        flex: 1,
        renderHeader: () => getHeader("Update All"),
        sortable: false,
        disableColumnMenu: true,
        renderCell: renderCheckbox
    },
    {
        field: "delete_all",
        maxWidth: 150,
        headerName: "Delete All",
        minWidth: 30,
        flex: 1,
        renderHeader: () => getHeader("Delete All"),
        sortable: false,
        disableColumnMenu: true,
        renderCell: renderCheckbox
    }
]


const rolePermissionRow = (permission: Permission) => {
    return {
        id: permission.id,
        module: permission.module,
        read: permission.canRead,
        create: permission.canCreate,
        update: permission.canUpdate,
        delete: permission.canDelete,
        read_all: permission.canReadAll,
        update_all: permission.canUpdateAll,
        delete_all: permission.canDeleteAll,
        role: permission.role
    }
}


export { roleColumn, roleListViewRow, rolePermissionColumns, rolePermissionRow };