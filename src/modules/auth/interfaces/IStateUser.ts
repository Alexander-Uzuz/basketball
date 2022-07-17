export interface IStateUser{
    user:IStateUserData,
    error:string | null;
    loading:boolean;
}

export interface IStateUserData{
    name:string | null,
    token:string | null,
    avatarUrl:string | null;
}