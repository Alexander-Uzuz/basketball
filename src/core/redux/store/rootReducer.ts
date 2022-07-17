import { combineReducers } from "@reduxjs/toolkit";
import playersReducer from 'modules/players/PlayersSlice';
import userReducer from 'modules/auth/authSlice';
import teamsReducer from 'modules/teams/TeamSlice';

export const rootReducer = combineReducers({
    user:userReducer,
    players:playersReducer,
    teams:teamsReducer
});

export type RootState = ReturnType<typeof rootReducer>;
