import { createAsyncThunk } from "@reduxjs/toolkit";
import { IAddPlayerObject } from "api/players/IPlayersRequest";
import {addPlayerReducer, removePlayerReducer,changePlayerReducer} from './PlayersSlice';
import { getPlayers,addPlayer, deletePlayer, IGetPlayer, changePlayer,IChangePlayer, getPlayer } from "api/players/playersRequest";

export const fetchPlayers:any = createAsyncThunk(
    'players/fetchPlayers',
    async function(data:IGetPlayer ,{rejectWithValue}){
        try{
           const response =  await getPlayers(data);
           return response;
        }catch(error:any){
            return rejectWithValue(error.message)
        }
    }
);

export const fetchPlayer:any = createAsyncThunk(
    'players/fetchPlayer',
    async function(data:any){
        const response = await getPlayer(data);
        return response;
    }
)

export const fetchChangePlayer:any = createAsyncThunk(
    'players/fetchChangePlayer',
    async function(data:IChangePlayer,{rejectWithValue,dispatch}){
        try{
           const response = await(changePlayer(data));
           dispatch(changePlayerReducer(response))
        }catch(error:any){
            return rejectWithValue(error.message)
        }
    }
)


export const fetchAddPlayer:any = createAsyncThunk(
    'players/fetchAddPlayer',
    async function(data:IAddPlayerObject,{dispatch}){
            const response = await addPlayer(data);
            dispatch(addPlayerReducer(response))            
        }
)


export const fetchDeletePlayer:any = createAsyncThunk(
    'players/fetchDeletePlayer',

    async function(player:{id:number,token:string},{rejectWithValue, dispatch}){
        const response = await(deletePlayer(player))
        dispatch(removePlayerReducer(response))
    }
)