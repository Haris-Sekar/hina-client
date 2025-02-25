import { GridColDef } from "@mui/x-data-grid";
import { getHeader, renderDateAndTime, renderMoreIcon, renderUser } from "../DataTableColumn";
import { IModule } from "../../Types/Module";

const moduleListView: GridColDef[] = [
    {
        field: "id",
        headerName: "ID", 
        renderHeader: () => getHeader(""),
        renderCell: () => {
            return renderMoreIcon();
        },
        hideable: false,
        hideSortIcons: true,
        sortable: false,
        disableColumnMenu: true,
        resizable: false,
        maxWidth: 10,
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
    }
];


const moduleListViewRow = (module: IModule) => {
    return {
        id: module.id,
        name: module.name,
        is_active: module.isActive ? "ACTIVE" : "INACTIVE",
        created_by: module.createdBy,
        created_time: module.createdTime,
        updated_by: module.updatedBy,
        updated_time: module.updatedTime,
    }
}


export { moduleListView, moduleListViewRow };  