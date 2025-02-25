/* eslint-disable @typescript-eslint/no-explicit-any */
import { toastPromise } from "../../Constants/commonFunctions";
import { User } from "../../Types/User";
import { API } from "../axios";

const inviteUser = (user: User) => {
    return toastPromise(API.post('/users/invite', {
        first_name: user.firstName,
        last_name: user.lastName,
        email: user.email,
        role_id: user.roleId,
        status: user.status
    }), {
        loading: "Creating User!",
        success: "User Created Successfully!",
        error: (err: any) => {

            if (err?.response?.data?.statusCode === 409) {
                return err?.response?.data?.message;
            }
            if (err?.response?.data?.errors) {
                return `${JSON.stringify(err.response.data.errors.join())}`
            } else {
                return `Something went wrong! please contact support or try again after sometime`
            }
        }
    })
}

export {
    inviteUser
}