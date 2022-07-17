import { useAppSelector } from 'core/redux/store/hooks';
import React from 'react';
import {Outlet, Navigate} from 'react-router-dom';


type Props = {}

export const RequireAuth = (props: Props) => {
    const {token} = useAppSelector((state => state.user.user))
    

    if(token){
        return <Outlet/>
    }else{
        return <Navigate to='/signIn'/>
    }
}
