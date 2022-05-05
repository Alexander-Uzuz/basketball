import { IStateUser,IStateUserData } from "../interfaces/IStateUser";
import { PayloadAction } from "@reduxjs/toolkit";

export const setPending = (state:IStateUser) =>{
    state.status = 'loading';
    state.error = null;
}

export const setFulfilled = (state:IStateUser, action:PayloadAction<IStateUserData>) =>{
    state.status = 'resolved';
    state.user = action.payload;
}

export const setRejected = (state:IStateUser,action:PayloadAction<string | null>) =>{
    state.status = 'rejected';
    state.error = action.payload;
}