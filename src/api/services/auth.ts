/* eslint-disable @typescript-eslint/no-explicit-any */
import { IAuthLogin, IAuthSignup } from "../../Types/User";
import { API } from "../axios";
import { customToast, toastPromise } from "../../Constants/commonFunctions";
import { Company } from "../../Types/Company";


async function login(credentials: IAuthLogin) {
    return toastPromise(API.post('/users/login', credentials), {
        loading: "Logging you in",
        success: "Logged Successfully",
        error: (err: any) => {
            if (err?.response?.data?.statusCode === 401) {
                return err?.response?.data?.message;
            }
            if (err?.response?.data?.errors) {
                return `${JSON.stringify(err.response.data.errors.join())}`
            } else {
                return `Something went wrong! please contact support or try again after sometime`
            }
        }
    });
}

async function signup(user: IAuthSignup) {
    return toastPromise(API.post('/users/create', {
        first_name: user.firstName,
        last_name: user.lastName,
        email: user.email,
        password: user.password
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

async function getUserDetailsForVerification(token: string) {
    try {
        const { data } = await API.post('/users/validate/jwt', { token });
        return data.data;
    } catch (error: any) {
        if (error?.response?.data?.error) {
            if (error?.response?.data?.error.includes("Unexpected token")) {
                customToast("error", "Link is invalid or expired!");
            }
        } else {
            customToast("error", "Something went wrong! please contact support or try again after sometime");
        }

        return null;
    }
}

async function verifyUser(token: string) {
    return toastPromise(API.get(`/users/confirm/${token}`), {
        loading: "Verifying User",
        success: "User Verified Successfully", 
        error: (err: any) => err.message
    });
}

async function createCompany(data: Company) {
    return toastPromise(API.post(`/company/create`, { name: data.name, gst_number: data.gstNumber, description: data.description }), {
        loading: "Creating Company",
        success: "Company Created Successfully",
        error: (err: any) => {
            if (err?.response?.data?.errors) {
                return `${JSON.stringify(err.response.data.errors.join())}` 
            } else {
                return `Something went wrong! please contact support or try again after sometime`
            }
        }
    });
}

export { login, signup, getUserDetailsForVerification, verifyUser, createCompany }