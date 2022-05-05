import * as Yup from 'yup';

export interface ISignIn{
    login:string,
    password:string,
    // accept?:boolean | null | undefined
}

export const schemaSignIn:Yup.SchemaOf<ISignIn> = Yup.object().shape({
    login: Yup.string().required('login is a required field'),
    password: Yup.string().required('password is a required field')
        .min(3, 'password must be at least 3 characters long'),
    // accept:Yup.boolean().oneOf([true],'Message'),
});