import {ITeam} from 'api/teams/ITeamsRequest';

export const findIdTeams = (cards:ITeam[], team:string) =>{
    const item = cards.find(card => card.id === Number(team))
    return item ? item.id : undefined
}