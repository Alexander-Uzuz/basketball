import { IAddPlayer, IAddPlayerObject, IPlayer } from './IPlayersRequest';
import { baseRequest } from "api/baseRequest";
import {get, post, remove, put} from '../baseRequest';

export interface IGetPlayer{
    token:any;
    searchValue?:string;
    currentPage?:string;
    pageSize?:string;
    teamsSearch?:string;
}

export interface IChangePlayer{
    player:IPlayer,
    token:any,
}

export const getPlayers = (props:IGetPlayer) =>  {
    if(props.searchValue || props.currentPage || props.pageSize || props.teamsSearch){
        return get(`/api/Player/GetPlayers?name=${props.searchValue ? props.searchValue : ''}${props.teamsSearch}&page=${props.currentPage}&pageSize=${props.pageSize}`, props.token.token)
    }else{
        return get('/api/Player/GetPlayers', props.token.token)
    }
}

export const getPlayer = (props:{token:any,id:number}) =>{
    return get(`/api/Player/Get?id=${props.id}`,props.token.token)
}

export const getPosition = (token:any) =>{
    return get('/api/Player/GetPositions',token)
}

export const changePlayer = (data:IChangePlayer) => put('/api/Player/Update',JSON.stringify(data.player), data.token)

export const addPlayer = (data:IAddPlayerObject) => {
    return post('/api/Player/Add', JSON.stringify(data.player), data.token);
}

export const deletePlayer = ({id,token}:{id:number,token:string}) => remove(`/api/Player/Delete?id=${id}`, token);


