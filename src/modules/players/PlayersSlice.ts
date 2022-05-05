import { createSlice, PayloadAction,createEntityAdapter } from "@reduxjs/toolkit";
import { IStatePlayers } from "./interfaces/IStatePlayer";
import {fetchPlayers,fetchDeletePlayer, fetchAddPlayer,fetchPlayer} from './PlayersThunk';
import { RootState } from "core/redux/store/rootReducer";

const setPending = (state:IStatePlayers) =>{
    state.error = null;
    state.status = null;
}

const setRejected = (state:IStatePlayers,action:PayloadAction<string | null>) =>{
    state.status = 'rejected';
    state.error = 'error';
}


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
	extraReducers: {
		[fetchPlayers.pending]:(state,action) =>{
			state.error = null;
    		state.status = 'pending';
			playersAdapter.removeAll(state)
		},
        [fetchAddPlayer.pending]:setPending,
		[fetchPlayer.pending]:(state,action) =>{
			state.error = null;
			state.status = null;
			state.player = null;
		},
		
		[fetchPlayers.fulfilled]: (state, action) => {
			state.status = null;
			state.loading = true;
			playersAdapter.setAll(state, action.payload.data);
			state.page = action.payload.page;
			state.count = action.payload.count;
			state.size = action.payload.size;
		},
		[fetchPlayer.fulfilled]:(state,action)=>{
			state.loading = true;
			state.player = action.payload;
		},
		[fetchPlayers.rejected]:setRejected,
        [fetchDeletePlayer.rejected]:setRejected,
        [fetchAddPlayer.rejected]:setRejected,
	}
});


export const {changePlayerReducer,removePlayerReducer,addPlayerReducer} = playersSlice.actions;

export default playersSlice.reducer;

// const initialState:IStatePlayers = {
//     players:[],
//     size:6,
//     page:1,
//     count:0,
//     loading:false,
//     status:null,
//     error:null,
// }


// const playersSlice = createSlice({
//     name:'players',
//     initialState,
//     reducers:{
//         addPlayerReducer(state, action:PayloadAction<IPlayer>){
//             if(action.payload){
//                 state.players.push(action.payload);
//             }
//             state.status = 'resolved'
//         },
//         removePlayerReducer(state, action:PayloadAction<IPlayer>){
//             state.players = state.players.filter(player => player.id !== action.payload.id);
//         },
//         changePlayerReducer(state,action:PayloadAction<IPlayer>){
//             state.players = state.players.map(player => player.id === action.payload.id ? action.payload : player);
//             state.status = 'resolved'
//         }
//     },
//     extraReducers:{
//         [fetchPlayers.pending]:setPending,
//         [fetchAddPlayer.rejected]:setPending,
//         [fetchPlayers.fulfilled]:(state, action:PayloadAction<IPlayersGet>) =>{
//             state.players = action.payload.data;
//             state.size = action.payload.size;
//             state.page = action.payload.page;
//             state.count = action.payload.count;
//             state.loading = true;
//             state.error = null;
//             state.status = null;
//         },
//         [fetchPlayers.rejected]:setRejected,
//         [fetchDeletePlayer.rejected]:setRejected,
//         [fetchAddPlayer.rejected]:setRejected,
//     }
// })