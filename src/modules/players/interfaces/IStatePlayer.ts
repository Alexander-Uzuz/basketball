import { IPlayer} from "api/players/IPlayersRequest";

export interface IStatePlayers{
    ids:any;
    entities:any;
    page:number;
    size:number;
    count:number;
    player:any;
    loading:boolean;
    error:null | string;
    status:null | string;
}