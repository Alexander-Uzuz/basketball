export interface IAddPlayerObject{
    player:IPlayer,
    token:string;
}

export interface IAddPlayer {
    name:string;
    position:string;
    team:number | undefined;
    avatarUrl:any;
    height:number;
    weight:number;
    birthday:string;
    number:number;
}

export interface IPlayer extends IAddPlayer{
    id:number;
}

export interface IDetailsPlayer extends IPlayer{
    teamName:string;
}

export interface IPlayersGet{
    data:IPlayer[],
    count:number,
    page:number,
    size:number
}
