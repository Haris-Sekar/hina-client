import { createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../../api/axios";
import { User } from "../../Types/User";

export const fetchAttachments = createAsyncThunk(
    'attachment/fetchAttachments',
    () => API.get('/user') as Promise<User>
)