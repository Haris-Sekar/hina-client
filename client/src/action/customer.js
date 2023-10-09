import { CUSTOMER } from "../constants/actionTypes";

import * as customerAPI from "../api/customer";
import Toast from "../components/Toast";

export const createCustomer = (formData, navigate) => async (dispatch) => {
    try{
        dispatch({type: CUSTOMER.IS_LOADING, data: true });

        const { data,code  } = await customerAPI.createCustomer(formData);

        if(code === 201) {
            dispatch({type: CUSTOMER.CREATE, data });
            dispatch({type: CUSTOMER.IS_LOADING, data: false });
        } else {
            Toast({ toastType: 2, message: data.message });
            dispatch({type: CUSTOMER.IS_LOADING, data: false });
        }

    } catch (e) {
        Toast({ toastType: 2, message: e.message });
    }
}