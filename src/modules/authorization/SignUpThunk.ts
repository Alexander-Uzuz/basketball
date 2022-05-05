import { createAsyncThunk } from "@reduxjs/toolkit";
import { signUp } from "api/auth/authRequest";
import { ISignUp } from "api/auth/IAuthRequest";

export const fetchUserSignUp:any = createAsyncThunk(
    'user/fetchUserSignUp',
    async function(data:ISignUp,{rejectWithValue}){
        try{
            return await signUp(data)
        }catch(error:any){
            return rejectWithValue(error.message)
        }
    }
)