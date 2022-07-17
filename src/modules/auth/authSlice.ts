import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IStateUser, IStateUserData } from "./interfaces/IStateUser";
import {fetchUser, fetchUserSignUp} from 'modules/auth/authThunk';

const initialState:IStateUser = {
    user:{
        name:null,
        avatarUrl:null,
        token:null,
    },
    loading:false,
    error:null,
};


const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        removeUser(state){
            state.user.name = null;
            state.user.avatarUrl = null;
            state.user.token = null;
        }

    },
    extraReducers:(builder)=>{
        builder.addCase(fetchUser .pending, (state) =>{
            state.loading = true;
            state.user = {name:null, avatarUrl:null, token:null}
            state.error = null;
        })
        builder.addCase(fetchUserSignUp .pending, (state) =>{
            state.loading = true;
            state.user = {name:null, avatarUrl:null, token:null}
            state.error = null;
        })
        builder.addCase(fetchUser .fulfilled, (state, action:PayloadAction<IStateUserData>) =>{
            state.user = action.payload;
            state.loading = false;
        })
        builder.addCase(fetchUserSignUp .fulfilled, (state, action:PayloadAction<IStateUserData>) =>{
            state.user = action.payload;
            state.loading = false;
        })
        builder.addCase(fetchUser .rejected, (state, action:PayloadAction<any>) => {
            state.loading = false;
            state.error = action.payload;
        })
        builder.addCase(fetchUserSignUp .rejected, (state, action:PayloadAction<any>) => {
            state.loading = false;
            state.error = action.payload;
        })
    }
})

export const {removeUser} = userSlice.actions;
export default userSlice.reducer;