import { useEffect, useState } from "react";
import { createItemGroupRow, itemGroup as DItemGroup } from "../../../Constants/MUIDataTableColumns/Inventory";
import ModulePage from "../../../components/ModulePage/ModulePage";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { useNavigate } from "react-router-dom";
import DialogBox from "../../../components/DialogBox";
import { IDialogBox } from "../../../Types/Form";
import { Typography } from "@mui/material"; 
import { ItemGroupRowData } from "../../../Types/Inventory";
import { deleteItemGroup } from "../../../api/services/inventory-temp";
import { fetchItemGroup } from "../../../store/Thunks/InventoryThunks";

const ItemGroup = () => {
    const { itemGroup, loading } = useAppSelector((state) => state.inventory);
    const rows: ItemGroupRowData[] = [];

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchItemGroup({}));
    }, [dispatch]);

    if (itemGroup && itemGroup.length > 0) {
        itemGroup.map((group) => {
            rows.push(createItemGroupRow(group));
        });
    }

    console.log(itemGroup);
    

    const navigate = useNavigate();

    function addItemGroup() {
        navigate("/app/inventory/itemgroup/add?from=detail");
    }

    function editCallback(e: number[]) {
        navigate(`/app/inventory/itemgroup/${e[0]}/edit?from=detail`);
    }

    const [deleteBtnLoading, setDeleteBtnLoading] = useState(false);

    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [deleteDialogDetails, setDeleteDialogDetails] = useState<IDialogBox>({
        description: <></>,
        failureBtnText: "",
        id: "",
        successBtnText: "",
        title: "",
    });

    function deleteCallBack(e: number[]) {
        setDeleteDialogDetails({
            title: "Confirm Delete these item groups",
            description: (
                <Typography>
                    Once these item groups are deleted it can not be restored
                </Typography>
            ),
            failureBtnText: "Cancel",
            successBtnText: "Delete",
            id: JSON.stringify(e),
        });
        setDeleteDialogOpen(true);
    }

    function confirmDeleteCallBack(_temp: any, e: string) {
        setDeleteDialogOpen(false);
        const ids = JSON.parse(e) as number[];
        setDeleteBtnLoading(true);
        deleteItemGroup(ids)
            .then(() => {
                dispatch(fetchItemGroup({}));
                setDeleteBtnLoading(false);
            })
            .catch(() => setDeleteBtnLoading(false));
    }

    return (
        <>
            {deleteDialogOpen && (
                <DialogBox
                    successCallBack={confirmDeleteCallBack}
                    dialogDetails={deleteDialogDetails}
                    open={deleteDialogOpen}
                    setOpen={setDeleteDialogOpen}
                />
            )}
            <ModulePage
                moduleName="Item Group"
                rows={rows}
                columns={DItemGroup}
                isLoading={loading}
                addCallBack={addItemGroup}
                editCallBack={editCallback}
                deleteCallBack={deleteCallBack}
                isServerPagination={false}
                deleteBtnLoading={deleteBtnLoading}
            />
        </>
    );
};

export default ItemGroup;
