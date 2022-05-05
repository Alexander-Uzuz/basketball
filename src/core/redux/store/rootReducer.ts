import { combineReducers } from "@reduxjs/toolkit";
import playersReducer from 'modules/players/PlayersSlice';
import userReducer from 'modules/authorization/authorizationSlice';
import teamsReducer from 'modules/teams/TeamReducer';

export const rootReducer = combineReducers({
    user:userReducer,
    players:playersReducer,
    teams:teamsReducer
});

export type RootState = ReturnType<typeof rootReducer>;
