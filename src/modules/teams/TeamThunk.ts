import { createAsyncThunk } from "@reduxjs/toolkit";
import {IAddTeamObject} from 'api/teams/ITeamsRequest'
import { getTeams, addTeam,deleteTeam, changeTeam,IChangeTeam,getTeam } from "api/teams/teamsRequest";
import {addTeamReducer, removeTeamReducer, changeTeamReducer} from './TeamSlice';
import { IGetTeam } from "api/teams/teamsRequest";


export const fetchTeams:any = createAsyncThunk(
    'teams/fetchTeams',
    async function(data:IGetTeam ,{rejectWithValue}){
            return getTeams(data)
    }
)

export const fetchTeam:any = createAsyncThunk(
    'teams/fetchTeam',
    async function (data:any){
        return getTeam(data)
    }
)

export const fetchAddTeam:any = createAsyncThunk(
    'teams/fetchAddTeam',
    async function(data:IAddTeamObject,{rejectWithValue, dispatch}){
            const response = await addTeam(data);
            dispatch(addTeamReducer(response))
    }
)

export const fetchGetOptions:any = createAsyncThunk(
    'teams/fetchGetOption',
    async function(token:any){
        return getTeams(token);
    }
)

export const fetchChangeTeam:any = createAsyncThunk(
    'teams/fetchChangeTeam',
    async function(data:IChangeTeam,{rejectWithValue,dispatch}){
           const response = await(changeTeam(data));
           dispatch(changeTeamReducer(response))
    }
)

export const fetchDeleteTeam:any = createAsyncThunk(
    'teams/fetchDeleteTeam',
    async function(team:{id:number,token:string},{rejectWithValue, dispatch}){
            const response = await(deleteTeam(team))
            dispatch(removeTeamReducer(response))
    }
)