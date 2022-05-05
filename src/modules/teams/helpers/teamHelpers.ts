import { createSlice, createAsyncThunk,PayloadAction } from "@reduxjs/toolkit";
import {IAddTeam, ITeam, ITeamsGet,IAddTeamObject} from 'api/teams/ITeamsRequest'
import {IStateTeams} from '../interfaces/IStateTeam'

export const setPending = (state:IStateTeams) =>{
    state.status = null;
    state.error = null;
}

export const setRejected = (state:IStateTeams,action:PayloadAction<string | null>) =>{
    state.status = 'rejected';
    state.error = action.payload;
}