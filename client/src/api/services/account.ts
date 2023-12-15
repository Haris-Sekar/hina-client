import { IAuthForm } from "../../models/IAuthForm";
import { ILogin } from "../../models/ILogin";
import { API } from "../axios";

async function register(data: IAuthForm) {
    console.log('here');
    
    API.post("user/signup", data)
    .then((res) => { 
        console.log(res);
    })
    .catch((err) => {
        console.log(err);
      });
}

async function verifyEmail(token: string) {
    API.post("user/verify", { token })
}

async function login(data: ILogin) {
    API.post("user/login", data).then((res) => {
        localStorage.setItem("token", res.data.jwt_token);
        
    });
}

export { register, verifyEmail, login };