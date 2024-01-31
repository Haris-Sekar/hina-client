import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../Types/User";

interface UserState {
    users: User[]
}

const initialState: UserState = {
    users: [],
}

export const UserReducer = createSlice({
    name: "user",
    initialState,
    reducers: {
        createUser: (state, action: PayloadAction<User>) => {
            state.users.push(action.payload)
        }
    }
});

export default UserReducer.reducer;
export const { createUser } = UserReducer.actions;