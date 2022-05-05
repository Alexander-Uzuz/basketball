import {ISignIn,ISignUp} from './IAuthRequest';
import { post } from "api/baseRequest";

export const signIn = (data: ISignIn) => {
    return post('/api/Auth/SignIn', JSON.stringify(data))
}

export const signUp = (data:ISignUp) =>{
    return post('/api/Auth/SignUp',JSON.stringify(data))
}

