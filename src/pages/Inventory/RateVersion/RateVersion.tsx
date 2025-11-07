import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { RateVersionRowData } from "../../../Types/Inventory";
import { fetchRateVersion } from "../../../store/Thunks/InventoryThunks";
import {
  createRateVersionRow,
  rateVersionColDef,
} from "../../../Constants/MUIDataTableColumns/Inventory";
import ModulePage from "../../../components/ModulePage/ModulePage";
import { updateRateVersion } from "../../../api/services/inventory";
import { useNavigate } from "react-router-dom";

const RateVersion = () => {
  const { loading, rateVersions, totalRateVersion } = useAppSelector(
    (state) => state.inventory
  );

  const rows: RateVersionRowData[] = [];

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchRateVersion({ page: 0, range: 25 }));
  }, [dispatch]);

  if (rateVersions && rateVersions.length > 0) {
    rateVersions.map((rateVersion) => {
      rows.push(createRateVersionRow(rateVersion));
    });
  }

  function onPaginationModelChange(e: { page: any; pageSize: any }) {
    dispatch(fetchRateVersion({ page: e.page, range: e.pageSize }));
  }
  const onSortModelChange = (e: any) => {
    const sortObj = e[0];
    if (sortObj) {
      let fieldName = sortObj.field;
      const sortOrder = sortObj.sort.toUpperCase();
      if (sortObj.field === "name") {
        fieldName = "name";
      }
      if (sortObj.field === "createdTime") {
        fieldName = "created_time";
      }
      if (sortObj.field === "updatedTime") {
        fieldName = "updated_time";
      }
      dispatch(
        fetchRateVersion({ sortBy: fieldName, sortOrder, page: 0, range: 25 })
      );
    } else {
      dispatch(fetchRateVersion({ page: 0, range: 25 }));
    }
  };

  const navigate = useNavigate();

  const addRateVersion = () => {
    navigate("add?from=detail");
  };

  const editRateVersion = () => {
    navigate("add?from=detail");
  };

  async function inlineEdit(
    newValue: RateVersionRowData,
    _oldValue: RateVersionRowData,
    _params: {}
  ) {
    const updateValue = {
      id: newValue.id,
      name: newValue.name,
    };
    const { data } = await updateRateVersion(updateValue, false);
    console.log(data);

    return { ...newValue, updatedTime: data.data.updated_time };
  }

  return (
    <>
      <ModulePage
        moduleName="Rate Version"
        rows={rows}
        columns={rateVersionColDef}
        isLoading={loading}
        addCallBack={addRateVersion}
        editCallBack={editRateVersion}
        deleteCallBack={() => {}}
        isServerPagination={true}
        onPaginationModelChange={onPaginationModelChange}
        rowCount={totalRateVersion}
        onSortModelChange={onSortModelChange}
        hasBulkDelete={true}
        checkboxSelection={true}
        inlineEditCallback={inlineEdit}
      />
    </>
  );
};

export default RateVersion;
