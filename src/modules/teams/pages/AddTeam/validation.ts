import * as Yup from 'yup';

export interface ITeam{
    name:string;
    division:string;
    conference:string;
    foundationYear:number;
    imageUrl:any;
    // accept?:boolean | null | undefined
}

export const schemaTeam:Yup.SchemaOf<ITeam> = Yup.object().shape({
    name: Yup.string().required('name is a required field'),
    division: Yup.string().required('division is a required field'),
    conference: Yup.string().required('conference is a required field'),
    foundationYear: Yup.number()
    .required('Year of fundation is a required field')
    .typeError('You must specfy a number')
    .min(1600,'Min value 1600')
    .max(2022, 'Max value 2022'),
    imageUrl:Yup.mixed().required('Photo a required field'),
    // accept:Yup.boolean().oneOf([true],'Message'),
});