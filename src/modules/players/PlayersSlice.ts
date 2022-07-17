import { createSlice, PayloadAction,createEntityAdapter } from "@reduxjs/toolkit";
import { IStatePlayers } from "./interfaces/IStatePlayer";
import {fetchPlayers,fetchDeletePlayer, fetchAddPlayer,fetchPlayer} from './PlayersThunk';
import { RootState } from "core/redux/store/rootReducer";

const playersAdapter = createEntityAdapter(); 

export const playersSelectors = playersAdapter.getSelectors((state:RootState) => state.players);

const initialState:IStatePlayers = playersAdapter.getInitialState({
	loading: false,
	count:6,
	page:1,
	size:6,
	player:null,
	status:null,
	error:null,
});
  

const playersSlice = createSlice({
	name: 'players',
	initialState,
	reducers: {
		addPlayerReducer(state,action){
			playersAdapter.addOne(state,action);
			state.status = 'resolved'
		},
		changePlayerReducer(state,action){
			playersAdapter.updateOne(state,action);
			state.status = 'resolved';
		},
		removePlayerReducer: playersAdapter.removeOne
	},
	extraReducers:(builder) => {
		builder.addCase(fetchPlayers .pending, state =>{
			state.error = null;
			state.status = 'pending';
			state.loading = true;
			playersAdapter.removeAll(state);
		})
		builder.addCase(fetchPlayer .pending, state => {
			state.error = null;
			state.status = 'pending';
			state.player = null;
			state.loading = true;
		})		
		builder.addCase(fetchAddPlayer .pending, state => {
			state.error = null;
			state.status = 'pending';
			state.loading = true;			
		})

		builder.addCase(fetchPlayers .fulfilled, (state, action) =>{
			state.status = 'fulfilled';
			state.loading = false;
			playersAdapter.setAll(state, action.payload.data);
			state.page = action.payload.page;
			state.count = action.payload.count;
			state.size = action.payload.size;
		})
		builder.addCase(fetchPlayer .fulfilled, (state, action) =>{
			state.player = action.payload;
		})

		builder.addCase(fetchPlayers .rejected, (state, action:PayloadAction<any>) => {
			state.error = action.payload;
			state.status = 'rejected';
			state.loading = false;
		})
		builder.addCase(fetchDeletePlayer .rejected, (state, action) =>{
			state.error = action.payload;
			state.status = 'rejected';
			state.loading = false;		
		})
		builder.addCase(fetchAddPlayer .rejected, (state, action) =>{
			state.error = action.payload;
			state.status = 'rejected';
			state.loading = false;		
		})

	}
});


export const {changePlayerReducer,removePlayerReducer,addPlayerReducer} = playersSlice.actions;

export default playersSlice.reducer;

