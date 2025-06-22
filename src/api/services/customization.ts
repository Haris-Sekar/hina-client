/* eslint-disable @typescript-eslint/no-explicit-any */
import { toastPromise } from "../../Constants/commonFunctions";
import { API } from "../axios";

const updateModule = (
	name: string,
	description: string,
	isActive: boolean,
	id: number
) => {
	return toastPromise(
		API.patch(`/modules/update/${id}`, {
			name,
			description,
			is_active: isActive,
		}),
		{
			loading: "Updating Module!",
			success: "Module Updated Successfully!",
			error: (err: any) => {
				if (err?.response?.data?.statusCode === 409) {
					return err?.response?.data?.message;
				}
				if (err?.response?.data?.errors) {
					return `${JSON.stringify(err.response.data.errors.join())}`;
				} else {
					return `Something went wrong! please contact support or try again after sometime`;
				}
			},
		}
	);
};

export { updateModule };