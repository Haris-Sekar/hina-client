import { toastPromise } from "../../Constants/commonFunctions";
import { ItemGroup } from "../../Types/Inventory";
import { API } from "../axios";

const addItemGroup = async (itemGroup: ItemGroup) => {
  return toastPromise(
    API.post(`/items/groups/create`, {
      name: itemGroup.name,
      description: itemGroup.description,
    }),
    {
      loading: "Adding Item Group",
      success: "Item group Added Successfully",
      error: (err: any) => err.message,
    }
  );
};

const deleteItemGroup = async (groupId: number) => {
  return toastPromise(API.delete(`/items/groups/delete/${groupId}`), {
    loading: "Deleting Item Group",
    success: "Item Group Deleted Successfully",
    error: (err: any) => err.message,
  });
};

export { addItemGroup,deleteItemGroup };
