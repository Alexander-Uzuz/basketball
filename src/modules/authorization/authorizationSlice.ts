import { RootState } from './../../core/redux/store/rootReducer';
import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { IStateUser } from "./interfaces/IStateUser";
import {fetchUserSignUp} from 'modules/authorization/SignUpThunk';
import {fetchUser} from 'modules/authorization/SignInThunk';
import {setPending, setFulfilled, setRejected} from './helpers/authorizationHelpers';

export const todoAdapter = createEntityAdapter();
export const todoSelectors = todoAdapter.getSelectors((state:any) => state.user);


const initialState:IStateUser = {
    user:{
        name:null,
        avatarUrl:null,
        token:null,
    },
    status:null,
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
    extraReducers:{
        [fetchUser.pending]:setPending,
        [fetchUserSignUp.pending]:setPending,
        [fetchUser.fulfilled]:setFulfilled,
        [fetchUserSignUp.fulfilled]:setFulfilled,
        [fetchUser.rejected]:setRejected,
        [fetchUserSignUp.rejected]:setRejected,
    }
})

export const {removeUser} = userSlice.actions;
export default userSlice.reducer;