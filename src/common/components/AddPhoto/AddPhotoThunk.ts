import { createAsyncThunk } from "@reduxjs/toolkit";
import { downloadImage } from "api/images/imagesRequest";
import { IDataPhoto } from "api/images/IImagesRequest";

export const addPhoto:any = createAsyncThunk(
    'photo/addPhoto',
    async function(data:IDataPhoto,{rejectWithValue}){
        try{
            return await downloadImage(data);
        }catch(error:any){
            return rejectWithValue(error.message)
        }
    }
)