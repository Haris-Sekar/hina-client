import { useEffect } from "react";
import {
    createItemRow, 
    itemColDef,
} from "../../../Constants/MUIDataTableColumns/Inventory";
import ModulePage from "../../../components/ModulePage/ModulePage";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { useNavigate } from "react-router-dom";
import { fetchItems } from "../../../store/Thunks/InventoryThunks";
import { ItemRowData } from "../../../Types/Inventory";

const Items = () => {
    const { items, loading, totalItems } = useAppSelector(
        (state) => state.inventory
    );
    const rows: ItemRowData[] = [];

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchItems({ page: 0, range: 25 }));
    }, [dispatch]);

    if (items && items.length > 0) {
        items.map((item) => {
            rows.push(createItemRow(item));
        });
    }

    console.log(items);


    const navigate = useNavigate();

    function addCallBack() {
        navigate("add?from=detail");
    }

    function editCallback(e: number[]) {
        navigate(`${e[0]}/edit?from=detail`);
    }

    function onPaginationModelChange(e: { page: any; pageSize: any }) {
        dispatch(fetchItems({ page: e.page, range: e.pageSize }));
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
            dispatch(fetchItems({ sortBy: fieldName, sortOrder, page: 0, range: 25 }));
        } else {
            dispatch(fetchItems({ page: 0, range: 25 }));
        }
    };
    async function inlineEdit(
        newValue: ItemRowData,
        _oldValue: ItemRowData,
        _params: {}
    ) {
        // const updateValue = {
        //     id: newValue.id,
        //     name: newValue.name,
        // };
        // const { data } = await updateSize(updateValue, false);
        // console.log(data);

        return { ...newValue };
    }

    return (
        <>
            <ModulePage
                moduleName="Item"
                rows={rows}
                columns={itemColDef}
                isLoading={loading}
                addCallBack={addCallBack}
                editCallBack={editCallback}
                deleteCallBack={() => { }}
                isServerPagination={true}
                onPaginationModelChange={onPaginationModelChange}
                rowCount={totalItems}
                onSortModelChange={onSortModelChange}
                hasBulkDelete={true}
                checkboxSelection={true}
                inlineEditCallback={inlineEdit}
            />
        </>
    );
};

export default Items;
