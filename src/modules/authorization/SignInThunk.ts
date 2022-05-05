import { createAsyncThunk, } from "@reduxjs/toolkit";
import { signIn, signUp } from "api/auth/authRequest";
import { ISignIn,ISignUp } from "api/auth/IAuthRequest";


export const fetchUser:any = createAsyncThunk(
    'user/fetchUser',
    async function (data:ISignIn, {rejectWithValue}){
        try{
            return await signIn(data)
        }catch(error:any){
            return rejectWithValue(error.message);
        }
    }
);
