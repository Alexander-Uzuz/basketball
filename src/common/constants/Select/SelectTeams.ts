import { ISelectOption } from "./ISelectOption";
import {ITeam} from 'api/teams/ITeamsRequest'

export const getSelectTeams = (teams:ITeam[]):ISelectOption[] =>{
    const SELECT_TEAMS:ISelectOption[] = [];
    teams.map(team => SELECT_TEAMS.push({value:team.id,label:team.name}))
    return SELECT_TEAMS;
}

export const getDefaultTeams = (teams:ITeam[], id:number) =>{
    const defaultSelect = teams.find(team => {
        if(team.id === id){
            return {value:team.name,label:team.name}
        }
    });
    return {value:defaultSelect?.name, label:defaultSelect?.name};

}