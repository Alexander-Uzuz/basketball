export interface IAddTeamObject{
    team:ITeam,
    token:string;
}

export interface IAddTeam {
    name: string
    foundationYear: number
    division: string
    conference: string
    imageUrl: string
}

export interface ITeam extends IAddTeam{
        id: number
};

export interface ITeamsGet{
    data:ITeam[],
    count:number,
    page:number,
    size:number
}





