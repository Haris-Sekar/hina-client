import { useEffect } from "react";
import {
  createSizeRow,
  size as DSize,
} from "../../../Constants/MUIDataTableColumns/Inventory";
import ModulePage from "../../../components/ModulePage/ModulePage";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { useNavigate } from "react-router-dom";
import { fetchSize } from "../../../store/Thunks/InventoryThunks";
import { SizeRowData } from "../../../Types/Inventory";
import { updateSize } from "../../../api/services/inventory";

const Size = () => {
  const { sizes, loading, totalSize } = useAppSelector(
    (state) => state.inventory
  );
  const rows: SizeRowData[] = [];

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchSize({ page: 0, range: 25 }));
  }, [dispatch]);

  if (sizes && sizes.length > 0) {
    sizes.map((size) => {
      rows.push(createSizeRow(size));
    });
  }

  const navigate = useNavigate();

  function addSize() {
    navigate("add?from=detail");
  }

  function editCallback(e: number[]) {
    navigate(`${e[0]}/edit?from=detail`);
  }

  function onPaginationModelChange(e: { page: any; pageSize: any }) {
    dispatch(fetchSize({ page: e.page, range: e.pageSize }));
  }

  const onSortModelChange = (e: any) => {
    const sortObj = e[0];
    if (sortObj) {
      let fieldName = sortObj.field;
      const sortOrder = sortObj.sort.toUpperCase();
      if (sortObj.field === "size") {
        fieldName = "name";
      }
      if (sortObj.field === "createdTime") {
        fieldName = "created_time";
      }
      if (sortObj.field === "updatedTime") {
        fieldName = "updated_time";
      }
      dispatch(fetchSize({ sortBy: fieldName, sortOrder, page: 0, range: 25 }));
    } else {
      dispatch(fetchSize({ page: 0, range: 25 }));
    }
  };
  async function inlineEdit(
    newValue: SizeRowData,
    _oldValue: SizeRowData,
    _params: {}
  ) {
    const updateValue = {
      id: newValue.id,
      name: newValue.name,
    };
    const { data } = await updateSize(updateValue, false);
    console.log(data);

    return { ...newValue, updatedTime: data.data.updated_time };
  }

  return (
    <>
      <ModulePage
        moduleName="Size"
        rows={rows}
        columns={DSize}
        isLoading={loading}
        addCallBack={addSize}
        editCallBack={editCallback}
        deleteCallBack={() => {}}
        isServerPagination={true}
        onPaginationModelChange={onPaginationModelChange}
        rowCount={totalSize}
        onSortModelChange={onSortModelChange}
        hasBulkDelete={true}
        checkboxSelection={true}
        inlineEditCallback={inlineEdit}
      />
    </>
  );
};

export default Size;
