/* eslint-disable @typescript-eslint/no-explicit-any */
import { toastPromise } from "../../Constants/commonFunctions";
import { User } from "../../Types/User";
import { API } from "../axios";

const inviteUser = (user: User) => {
	return toastPromise(
		API.post("/users/invite", {
			first_name: user.firstName,
			last_name: user.lastName,
			email: user.email,
			role_id: user.roleId,
			status: user.status,
		}),
		{
			loading: "Creating User!",
			success: "User Created Successfully!",
			error: (err: any) => {
				if (err?.response?.data?.statusCode === 409) {
					return err?.response?.data?.message;
				}
				if (err?.response?.data?.message) {
					return err.response.data.message;
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

const updateUser = (user: User) => {
	const params: {
		first_name: string;
		last_name: string;
		role_id?: number;
		status?: string;
	} = {
		first_name: user.firstName,
		last_name: user.lastName,
	};
	if (user.roleId) {
		params.role_id = user.roleId;
	}
	if (user.status) {
		params.status = user.status;
	}

	return toastPromise(API.patch(`/user/${user.userId}/update`, params), {
		loading: "Updating User",
		success: "User updated successfully",
		error: (err: any) => {
			if (err?.response?.data?.statusCode === 409) {
				return err?.response?.data?.message;
			}
			if (err?.response?.data?.message) {
				return err.response.data.message;
			}

			if (err?.response?.data?.errors) {
				return `${JSON.stringify(err.response.data.errors.join())}`;
			} else {
				return `Something went wrong! please contact support or try again after sometime`;
			}
		},
	});
};

const deleteUser = (userId: number) => {
	return toastPromise(API.delete(`/users/${userId}`), {
		loading: "Deleting User!",
		success: "User Deleted Successfully!",
		error: (err: any) => {
			if (err?.response?.data?.statusCode === 404) {
				return err?.response?.data?.message;
			}
			if (err?.response?.data?.errors) {
				return `${JSON.stringify(err.response.data.errors.join())}`;
			} else {
				return `Something went wrong! please contact support or try again after sometime`;
			}
		},
	});
};

const reInviteUser = (userId: number) => {
	return toastPromise(API.post(`/users/${userId}/re-invite`), {
		loading: "Re-inviting User!",
		success: "User Re-invited Successfully!",
		error: (err: any) => {
			if (err?.response?.data?.statusCode === 404) {
				return err?.response?.data?.message;
			}
			if (err?.response?.data?.errors) {
				return `${JSON.stringify(err.response.data.errors.join())}`;
			} else {
				return `Something went wrong! please contact support or try again after sometime`;
			}
		},
	});
};

export { inviteUser, deleteUser, reInviteUser, updateUser };
