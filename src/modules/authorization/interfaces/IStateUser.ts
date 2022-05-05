export interface IStateUser{
    user:IStateUserData,
    error:string | null;
    status:string | null;
}

export interface IStateUserData{
    name:string | null,
    token:string | null,
    avatarUrl:string | null;
}