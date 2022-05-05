import { ISelectOption } from "./ISelectOption";
import {getPosition} from 'api/players/playersRequest';

export const SELECT_POSITION:ISelectOption[] = [
    { value: 'Center Forward', label: 'Center Forward' },
    { value: 'Guard Forward', label: 'Guard Forward' },
    { value: 'Forward', label: 'Forward' },
    { value: 'Center', label: 'Center' },
    { value: 'Guard', label: 'Guard' },
];

export const select_position = async(token:any) =>{
    const positions:string[] = await getPosition(token);
    const SELECT_POSITION:ISelectOption[] = []
    positions.map(position => SELECT_POSITION.push({value:position, label:position}))

    return SELECT_POSITION;
}

