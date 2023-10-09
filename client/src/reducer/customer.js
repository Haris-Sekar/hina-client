import * as actionType from "../constants/actionTypes";


const customerReducer = (state = {isLoading: false, action: ""},action) =>{
    switch(action.type){
        case actionType.CUSTOMER.CREATE:
            return {...state, isLoading: action.data.isLoading, action: action.data.action};
        default:
            return state;
    }
}

export default customerReducer;