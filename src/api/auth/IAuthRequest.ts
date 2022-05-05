export interface ISignIn{
    login:string;
    password:string;
}

export interface ISignUp{
    userName:string;
    login:string;
    password:string;
}

export interface IResponseUser{
    name:string;
    avatarUrl:string | null;
    token:string;
};