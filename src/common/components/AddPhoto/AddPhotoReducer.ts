import { IStatePhoto } from './IAddPhoto';
import { createSlice } from "@reduxjs/toolkit";
import {addPhoto} from './AddPhotoThunk';

const initialState:IStatePhoto = {
    photo:null,
    error:null,
    status:null,
}

export const photoSlice = createSlice({
    name:'photo',
    initialState,
    reducers:{},
    extraReducers:{
        [addPhoto.pending]:(state) =>{
            state.status = 'loading';
            state.error = null;
        },
        [addPhoto.fulfilled]:(state,action) =>{
            state.status = 'resolved';
            state.photo = action.payload;
        },
        [addPhoto.rejected]:(state,action) =>{
            state.status = 'rejected';
            state.error = action.payload;
        }
    }
})

