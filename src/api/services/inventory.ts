import { toastPromise } from "../../Constants/commonFunctions";
import { ItemGroup, Size } from "../../Types/Inventory";
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

const updateItemGroup = async (itemGroup: ItemGroup) => {
  return toastPromise(
    API.patch(`/items/groups/update/${itemGroup.groupId}`, {
      name: itemGroup.name,
      description: itemGroup.description,
      hsn_code: itemGroup.hsnCode,
    }),
    {
      loading: "Updating Item Group",
      success: "Item Group Updated Successfully",
      error: (err: any) => err.message,
    }
  );
};


const createSize = async (size: string) => {
  return toastPromise(API.post(`/items/sizes/create`, {
    name: size
  }), {
    loading: "Adding Size",
    success: "Size Added Successfully",
    error: (err: any) => err.message,
  });
};

const deleteSize = async (sizeId: number) => {
  return toastPromise(API.delete(`/items/sizes/delete/${sizeId}`), {
    loading: "Deleting Size",
    success: "Size Deleted Successfully",
    error: (err: any) => err.message, 
  }) 
}

const updateSize = async (size: Size) => {
  return toastPromise(API.patch(`/items/sizes/update/${size.id}`, {
    name: size.name
  }), {
    loading: "Updating Size",
    success: "Size Updated Successfully",
    error: (err: any) => err.message,
  })
}


export { addItemGroup, deleteItemGroup, updateItemGroup, createSize, deleteSize, updateSize };
