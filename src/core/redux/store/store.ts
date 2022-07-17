import {configureStore} from '@reduxjs/toolkit';
import userReducer from 'modules/auth/authSlice';
import { rootReducer } from './rootReducer';

const preloadedUserState = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '') : {name:null,avatarUrl:null,token:null};

const preloadedState = {
    user:{
        user:{
            name:preloadedUserState.name,
            avatarUrl:preloadedUserState.avatarUrl,
            token:preloadedUserState.token,
        },
        error:null,
        loading:false,
    },
}

export const store = configureStore({
    reducer:rootReducer,
    preloadedState
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;