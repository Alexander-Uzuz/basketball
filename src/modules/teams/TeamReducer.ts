import { createSlice, PayloadAction,createEntityAdapter } from "@reduxjs/toolkit";
import {ITeam, ITeamsGet } from 'api/teams/ITeamsRequest'
import {IStateTeams} from './interfaces/IStateTeam'
import {fetchTeams,fetchDeleteTeam, fetchAddTeam,fetchGetOptions, fetchTeam} from './TeamThunk'
// import {setPending, setRejected} from 'modules/teams/helpers/teamHelpers';
import { RootState } from "core/redux/store/rootReducer";

const setPending = (state:IStateTeams) =>{
    state.error = null;
    state.status = null;
}

const setRejected = (state:IStateTeams,action:PayloadAction<string | null>) =>{
    state.status = 'rejected';
    state.error = 'error';
}


const teamsAdapter = createEntityAdapter(); 

export const teamsSelectors = teamsAdapter.getSelectors((state:RootState) => state.teams);

const initialState:IStateTeams = teamsAdapter.getInitialState({
	teamsOptions:[],
	team:null,
	loading: false,
	count:6,
	page:1,
	size:6,
	status:null,
	error:null,
});
  

const teamsSlice = createSlice({
	name: 'teams',
	initialState,
	reducers: {
		addTeamReducer(state,action){
			teamsAdapter.addOne(state,action);
			state.status = 'resolved'
		},
		changeTeamReducer(state,action){
			teamsAdapter.updateOne(state,action);
			state.status = 'resolved';
		},
		removeTeamReducer: teamsAdapter.removeOne
	},
	extraReducers: {
		[fetchTeams.pending]:(state,action) =>{
			state.error = null;
			state.status = 'pending';
			teamsAdapter.removeAll(state)
		},
		[fetchTeam.pending]:(state,action) =>{
			state.error = null;
			state.status = null;
			state.team = null;
		},
        [fetchAddTeam.pending]:setPending,
		[fetchGetOptions.pending]:setPending,
		[fetchTeams.fulfilled]: (state, action) => {
			state.status = null;
			state.loading = true;
			teamsAdapter.setAll(state, action.payload.data);
			state.page = action.payload.page;
			state.count = action.payload.count;
			state.size = action.payload.size;
		},
		[fetchGetOptions.fulfilled]:(state,action) =>{
			state.teamsOptions = action.payload.data;
		},
		[fetchTeam.fulfilled]:(state,action) =>{
			state.team = action.payload;
		},
		[fetchTeams.rejected]:setRejected,
        [fetchDeleteTeam.rejected]:setRejected,
        [fetchAddTeam.rejected]:setRejected,
		[fetchGetOptions.rejectd]:setRejected,
	}
});


export default teamsSlice.reducer;

export const {addTeamReducer,removeTeamReducer, changeTeamReducer} = teamsSlice.actions


// const initialState:IStateTeams = {
//     teams:[],
//     size:6,
//     page:1,
//     count:0,
//     loading:false,
//     status:null,
//     error:null,
// }


// const teamsSlice = createSlice({
//     name:'teams',
//     initialState,
//     reducers:{
//         addTeamReducer(state, action:PayloadAction<ITeam>){
//             state.teams.push(action.payload);
//             state.status = 'resolved'
//         },
//         changeTeamReducer(state,action:PayloadAction<ITeam>){
//             state.teams.map(team => team.id === action.payload.id ? action.payload : team);
//             state.status = 'resolved'
//         },
//         removeTeamReducer(state, action:PayloadAction<ITeam>){
//             state.teams = state.teams.filter(team => team.id !== action.payload.id);
//         }
//     },
//     extraReducers:{
//         [fetchTeams.pending]:setPending,
//         [fetchTeams.fulfilled]:(state, action:PayloadAction<ITeamsGet>) =>{
//             state.teams = action.payload.data;
//             state.size = action.payload.size;
//             state.page = action.payload.page;
//             state.count = action.payload.count;
//             state.loading = true;
//             state.status = null;
//             state.error = null;
//         },
//         [fetchTeams.rejected]:setRejected,
//         [fetchDeleteTeam.rejected]:setRejected

//     }
// })


