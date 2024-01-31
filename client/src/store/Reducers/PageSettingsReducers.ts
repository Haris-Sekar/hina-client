import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PageSettings } from "../../Types/PageSettings";


const initialState: PageSettings = {
    isDarkTheme: false
}

export const PageSettingsReducer = createSlice({
    name: "pageSettings",
    initialState,
    reducers: {
        togglePageMode: (state, action: PayloadAction<PageSettings>) => {
            state.isDarkTheme = action.payload.isDarkTheme
        }
    }
});

export default PageSettingsReducer.reducer;
export const { togglePageMode } = PageSettingsReducer.actions; 