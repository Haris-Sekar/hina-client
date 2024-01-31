import toast from "react-hot-toast";
import { IAuthLogin } from "../../Types/User";
import { API } from "../axios";



async function login(credentials: IAuthLogin) {
    return toast.promise(API.post('/user/login', credentials), {
        loading: "Loging you in",
        success: "Logged Successfully",
        error: (err) => `This just happend ${JSON.stringify(err)}`
    })
}


export { login }