import { GridColDef } from "@mui/x-data-grid";
import { getHeader, renderDateAndTime, renderUser } from "../DataTableColumn";
import {
  Item,
  ItemGroup,
  ItemGroupRowData,
  ItemRowData,
  RateVersion,
  RateVersionRowData,
  Size,
  SizeRowData,
} from "../../Types/Inventory";

import { deleteItemGroup, deleteSize } from "../../api/services/inventory";
import {
  fetchItemGroup,
  fetchItems,
  fetchRateVersion,
  fetchSize,
} from "../../store/Thunks/InventoryThunks";
import RenderMoreIcon from "./MoreIcon";

const createItemGroupRow = (group: ItemGroup): ItemGroupRowData => {
  return {
    id: group.groupId,
    name: group.name,
    description: group.description,
    hsnCode: group.hsnCode,
    createdBy: group.createdBy,
    createdTime: group.createdTime,
    updatedBy: group.updatedBy,
    updatedTime: group.updatedTime,
  };
};

const itemGroup: GridColDef[] = [
  {
    field: "id",
    headerName: "ID",
    renderHeader: () => getHeader(""),
    renderCell: (e) => {
      return RenderMoreIcon(e, {
        name: "Item Group",
        apiName: "itemgroup",
        deleteEntity: deleteItemGroup,
        fetchEntity: fetchItemGroup,
      });
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
    editable: true,
    renderHeader: () => getHeader("Group Name"),
  },
  {
    field: "description",
    headerName: "Description",
    minWidth: 200,
    editable: true,
    flex: 1,
    renderHeader: () => getHeader("Description"),
  },
  {
    field: "hsnCode",
    headerName: "HSN Code",
    minWidth: 200,
    editable: true,
    flex: 1,
    renderHeader: () => getHeader("HSN Code"),
  },
  {
    field: "createdBy",
    headerName: "Created By",
    minWidth: 200,
    flex: 1,
    renderHeader: () => getHeader("Created By"),
    renderCell: (e) => renderUser(e),
  },
  {
    field: "createdTime",
    headerName: "Created Time",
    minWidth: 200,
    flex: 1,
    renderHeader: () => getHeader("Created Time"),
    renderCell: (e) => renderDateAndTime(e),
  },
  {
    field: "updatedBy",
    headerName: "Updated By",
    minWidth: 200,
    flex: 1,
    renderHeader: () => getHeader("Updated By"),
    renderCell: (e) => renderUser(e),
  },
  {
    field: "updatedTime",
    headerName: "Updated Time",
    minWidth: 200,
    flex: 1,
    renderHeader: () => getHeader("Updated Time"),
    renderCell: (e) => renderDateAndTime(e),
  },
];

const createSizeRow = (size: Size): SizeRowData => {
  return {
    id: size.id,
    name: size.name,
    createdBy: size.createdBy,
    createdTime: size.createdTime,
    updatedBy: size.updatedBy,
    updatedTime: size.updatedTime,
  };
};

const size: GridColDef[] = [
  {
    field: "id",
    headerName: "ID",
    renderHeader: () => getHeader(""),
    renderCell: (e) => {
      return RenderMoreIcon(e, {
        name: "Size",
        apiName: "size",
        deleteEntity: deleteSize,
        fetchEntity: fetchSize,
      });
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
    editable: true,
    minWidth: 200,
    flex: 1,
    renderHeader: () => getHeader("Size"),
  },
  {
    field: "createdBy",
    headerName: "Created By",
    minWidth: 200,
    flex: 1,
    renderHeader: () => getHeader("Created By"),
    renderCell: (e) => renderUser(e),
    hideSortIcons: true,
  },
  {
    field: "createdTime",
    headerName: "Created Time",
    minWidth: 200,
    flex: 1,
    renderHeader: () => getHeader("Created Time"),
    renderCell: (e) => renderDateAndTime(e),
  },
  {
    field: "updatedBy",
    headerName: "Updated By",
    minWidth: 200,
    flex: 1,
    renderHeader: () => getHeader("Updated By"),
    renderCell: (e) => renderUser(e),
    hideSortIcons: true,
  },
  {
    field: "updatedTime",
    headerName: "Updated Time",
    minWidth: 200,
    flex: 1,
    renderHeader: () => getHeader("Updated Time"),
    renderCell: (e) => renderDateAndTime(e),
  },
];

const createRateVersionRow = (rateVersion: RateVersion): RateVersionRowData => {
  return {
    ...rateVersion,
  };
};

const rateVersionColDef: GridColDef[] = [
  {
    field: "id",
    headerName: "ID",
    renderHeader: () => getHeader(""),
    renderCell: (e) => {
      return RenderMoreIcon(e, {
        name: "Rate Version",
        apiName: "rate-version",
        deleteEntity: deleteSize,
        fetchEntity: fetchRateVersion,
      });
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
    editable: true,
    minWidth: 200,
    flex: 1,
    renderHeader: () => getHeader("Name"),
  },
  {
    field: "isActive",
    headerName: "is Active",
    editable: true,
    minWidth: 200,
    flex: 1,
    renderHeader: () => getHeader("Is Active"),
  },
  {
    field: "isDefault",
    headerName: "Is Default",
    editable: true,
    minWidth: 200,
    flex: 1,
    renderHeader: () => getHeader("Is Default"),
  },
  {
    field: "createdBy",
    headerName: "Created By",
    minWidth: 200,
    flex: 1,
    renderHeader: () => getHeader("Created By"),
    renderCell: (e) => renderUser(e),
    hideSortIcons: true,
  },
  {
    field: "createdTime",
    headerName: "Created Time",
    minWidth: 200,
    flex: 1,
    renderHeader: () => getHeader("Created Time"),
    renderCell: (e) => renderDateAndTime(e),
  },
  {
    field: "updatedBy",
    headerName: "Updated By",
    minWidth: 200,
    flex: 1,
    renderHeader: () => getHeader("Updated By"),
    renderCell: (e) => renderUser(e),
    hideSortIcons: true,
  },
  {
    field: "updatedTime",
    headerName: "Updated Time",
    minWidth: 200,
    flex: 1,
    renderHeader: () => getHeader("Updated Time"),
    renderCell: (e) => renderDateAndTime(e),
  },
];


const deleteItem = (id: number) => {

}

const itemColDef: GridColDef[] = [
  {
    field: "id",
    headerName: "ID",
    renderHeader: () => getHeader(""),
    renderCell: (e) => {
      return RenderMoreIcon(e, {
        name: "Item",
        apiName: "item",
        deleteEntity: deleteItem,
        fetchEntity: fetchItems,
      });
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
    headerName: "name",
    renderHeader: () => getHeader("Name"),
    editable: true,
    minWidth: 200,
    flex: 1,
  },
  {
    field: "description",
    headerName: "description",
    renderHeader: () => getHeader("Description"),
    editable: true,
    minWidth: 200,
    flex: 1,
  },
  {
    field: "sku",
    headerName: "sku",
    renderHeader: () => getHeader("SKU"),
    editable: true,
    minWidth: 200,
    flex: 1,
  },
  {
    field: "createdBy",
    headerName: "createdBy",
    renderHeader: () => getHeader("Created By"),
    renderCell: (e) => renderUser(e),
    minWidth: 200,
    flex: 1,
  },
  {
    field: "createdTime",
    headerName: "createdTime",
    renderHeader: () => getHeader("Created Time"),
    renderCell: (e) => renderDateAndTime(e),
    minWidth: 200,
    flex: 1,
  },
  {
    field: "updatedBy",
    headerName: "updatedBy",
    renderHeader: () => getHeader("Updated By"),
    renderCell: (e) => renderUser(e),
    minWidth: 200,
    flex: 1,
  },
  {
    field: "updatedTime",
    headerName: "updatedTime",
    renderHeader: () => getHeader("Updated Time"),
    renderCell: (e) => renderDateAndTime(e),
    minWidth: 200,
    flex: 1,
  },
]

const createItemRow = (item: Item): ItemRowData => {
  return {
    ...item,
  };
}

export {
  createItemGroupRow,
  itemGroup,
  createSizeRow,
  size,
  createRateVersionRow,
  rateVersionColDef,
  createItemRow,
  itemColDef,
};
