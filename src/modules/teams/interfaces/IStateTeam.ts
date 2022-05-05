import { ITeam} from "api/teams/ITeamsRequest";

export interface IStateTeams{
    teamsOptions:any;
    ids:any;
    team:any;
    entities:any;
    page:number;
    size:number;
    count:number;
    loading:boolean;
    error:null | string;
    status:null | string;
}