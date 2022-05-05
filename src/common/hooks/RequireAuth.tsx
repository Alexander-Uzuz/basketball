import React,{FC} from 'react';
import {useLocation, Navigate} from 'react-router-dom';

type Props = {
    children:JSX.Element
}

export const RequireAuth:FC<Props> = ({children}) => {
    const location = useLocation();
    const token = localStorage.getItem('user')? JSON.parse(localStorage.getItem('user') || '{}') : null;


    if(!token){
        return <Navigate to='/SignIn' state={{from:location}}/>
    }

    return children;
}