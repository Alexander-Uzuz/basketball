import * as Yup from 'yup';

export interface IPlayer{
    name:string;
    position:string;
    team:string;
    avatarUrl:any;
    height:number;
    weight:number;
    birthday:string;
    number:number;
}

export const schemaTeam:Yup.SchemaOf<IPlayer> = Yup.object().shape({
    name: Yup.string().required('name is a required field'),
    position: Yup.string().required('position is a required field'),
    team:Yup.string().required('team is a required field'),
    avatarUrl:Yup.mixed().required('Photo is a required field'),
    height:
    Yup.number()
    .required('Height is a required field')
    .typeError('You must specfy a number')
    .min(150,'Min value 150')
    .max(240, 'Max value 240'),
    weight:
    Yup.number()
    .required('Weight is a required field')
    .typeError('You must specfy a number')
    .min(20,'Min value 20')
    .max(120, 'Max value 120'),
    birthday:Yup.string().required('Birtnday is a required field'),
    number:
    Yup.number()
    .required('Number is a required field')
    .typeError('You must specfy a number')
    .min(1,'Min value 1')
    .max(99, 'Max value 99'),
});


// .typeError('you must specify a number')
//                         .min(0, 'Min value 0.')
//                         .max(30, 'Max value 30.')
