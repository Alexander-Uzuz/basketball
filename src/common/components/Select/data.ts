import { ISelectOption } from "common/constants/Select/ISelectOption"

export const optionsSize:ISelectOption[] = [{ value: 6, label: '6' },{ value: 12, label: '12' },{ value: 24, label: '24' }]

export interface IOption {
    readonly value: string | number;
    readonly label: string;
  }
  
  