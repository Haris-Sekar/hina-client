import { toastPromise } from "../../Constants/commonFunctions";
import { ItemGroup, Size } from "../../Types/Inventory";
import { API } from "../axios";

const addItemGroup = async (itemGroup: ItemGroup, isToastNeeded = true) => {
  if (isToastNeeded) {
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
  } else {
    return API.post(`/items/groups/create`, {
      name: itemGroup.name,
      description: itemGroup.description,
      hsn_code: itemGroup.hsnCode,
    });
  }
};

const deleteItemGroup = async (groupId: number) => {
  return toastPromise(API.delete(`/items/groups/delete/${groupId}`), {
    loading: "Deleting Item Group",
    success: "Item Group Deleted Successfully",
    error: (err: any) => err.message,
  });
};

const updateItemGroup = async (itemGroup: ItemGroup, isToastNeeded = true) => {
  if (isToastNeeded) {
    return toastPromise(
      API.patch(`/items/groups/update/${itemGroup.groupId}`, {
        name: itemGroup.name,
        description: itemGroup.description,
        hsn_code: itemGroup.hsnCode,
      }),
      {
        loading: "Updating Item Group",
        success: "Item Group Updated Successfully",
        error: (err: any) => { 
          if (err?.status === 403 && err?.response?.data.errors) {
            return err.response.data.errors;
          }
          return err.message;
        },
      }
    );
  } else {
    return API.patch(`/items/groups/update/${itemGroup.groupId}`, {
      name: itemGroup.name,
      description: itemGroup.description,
      hsn_code: itemGroup.hsnCode,
    });
  }
};

const createSize = async (size: string) => {
  return toastPromise(
    API.post(`/items/sizes/create`, {
      name: size,
    }),
    {
      loading: "Adding Size",
      success: "Size Added Successfully",
      error: (err: any) => err.message,
    }
  );
};

const deleteSize = async (sizeId: number) => {
  return toastPromise(API.delete(`/items/sizes/delete/${sizeId}`), {
    loading: "Deleting Size",
    success: "Size Deleted Successfully",
    error: (err: any) => err.message,
  });
};

const updateSize = async (size: Size, isToastNeeded = true) => {
  if (isToastNeeded) {
    return toastPromise(
      API.patch(`/items/sizes/update/${size.id}`, {
        name: size.name,
      }),
      {
        loading: "Updating Size",
        success: "Size Updated Successfully",
        error: (err: any) => err.message,
      }
    );
  } else {
    return API.patch(`/items/sizes/update/${size.id}`, { name: size.name });
  }
};

export {
  addItemGroup,
  deleteItemGroup,
  updateItemGroup,
  createSize,
  deleteSize,
  updateSize,
};
