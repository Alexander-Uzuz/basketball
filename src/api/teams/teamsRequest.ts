import { IAddTeamObject } from 'api/teams/ITeamsRequest';
import { baseRequest } from "api/baseRequest";
import {IAddTeam, ITeam} from './ITeamsRequest'
import {get, post, remove, put} from '../baseRequest';

export interface IGetTeam{
    token:any;
    searchValue?:string;
    currentPage?:string;
    pageSize?:string;
}

export interface IChangeTeam{
    team:ITeam,
    token:any,
}


export const getTeams = (props:IGetTeam) => {
    if(props.currentPage || props.pageSize || props.searchValue){
        return get(`/api/Team/GetTeams?name=${props.searchValue}&page=${props.currentPage}&pageSize=${props.pageSize}`,props.token);
    }else{
        return get('/api/Team/GetTeams', props.token)
    }
}

export const getTeam = (props:{token:any,id:number}) =>{
    return get(`/api/Team/Get?id=${props.id}`,props.token.token)
}

export const changeTeam = (data:IChangeTeam) => put('/api/Team/Update',JSON.stringify(data.team), data.token)

export const addTeam = (data:IAddTeamObject) => post('/api/Team/Add', JSON.stringify(data.team), data.token);

export const deleteTeam = ({id,token}: {id:number,token:any}) => remove(`/api/Team/Delete?id=${id}`, token.token);

