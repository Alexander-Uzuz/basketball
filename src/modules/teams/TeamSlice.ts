import { createSlice, PayloadAction,createEntityAdapter } from "@reduxjs/toolkit";
import {IStateTeams} from './interfaces/IStateTeam'
import {fetchTeams,fetchDeleteTeam, fetchAddTeam,fetchGetOptions, fetchTeam} from './TeamThunk'
import { RootState } from "core/redux/store/rootReducer";

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
	extraReducers:(builder) => {
		builder.addCase(fetchTeams .pending, state =>{
			state.error = null;
			state.status = 'pending';
			state.loading = true;
			teamsAdapter.removeAll(state);
		})
		builder.addCase(fetchTeam .pending, state => {
			state.error = null;
			state.status = 'pending';
			state.team = null;
			state.loading = true;
		})		
		builder.addCase(fetchAddTeam .pending, state => {
			state.error = null;
			state.status = 'pending';
			state.loading = true;			
		})
		builder.addCase(fetchGetOptions .pending, state =>{
			state.error = null;
			state.status = 'pending';
			state.loading = true;
		})

		builder.addCase(fetchTeams .fulfilled, (state, action) =>{
			state.status = 'fulfilled';
			state.loading = false;
			teamsAdapter.setAll(state, action.payload.data);
			state.page = action.payload.page;
			state.count = action.payload.count;
			state.size = action.payload.size;
		})
		builder.addCase(fetchTeam .fulfilled, (state, action) =>{
			state.team = action.payload;
		})
		builder.addCase(fetchGetOptions .fulfilled, (state, action) =>{
			state.loading = false;
			state.status = 'fulfilled';
			state.teamsOptions = action.payload.data
		})

		builder.addCase(fetchTeams .rejected, (state, action:PayloadAction<any>) => {
			state.error = action.payload;
			state.status = 'rejected';
			state.loading = false;
		})
		builder.addCase(fetchDeleteTeam .rejected, (state, action) =>{
			state.error = action.payload;
			state.status = 'rejected';
			state.loading = false;		
		})
		builder.addCase(fetchAddTeam .rejected, (state, action) =>{
			state.error = action.payload;
			state.status = 'rejected';
			state.loading = false;		
		})
		builder.addCase(fetchGetOptions .rejected, (state, action) =>{
			state.error = action.payload;
			state.status = 'rejected';
			state.loading = false;		
		})
	}
});


export default teamsSlice.reducer;

export const {addTeamReducer,removeTeamReducer, changeTeamReducer} = teamsSlice.actions


