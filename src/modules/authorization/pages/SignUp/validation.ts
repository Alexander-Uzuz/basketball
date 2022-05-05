import * as Yup from 'yup';

interface ISchemaRegistration{
    username:string,
    login:string,
    password:string,
    passwordConfirm:string,
    // accept?:boolean | null | undefined
}

export const schemaRegistration:Yup.SchemaOf<ISchemaRegistration> = Yup.object().shape({
    username: Yup.string().required('username is a required field'),
    login: Yup.string().required('login is a required field'),
    password: Yup.string().required('password is a required field')
        .min(3, 'password must be at least 3 characters long'),
    passwordConfirm: Yup.string().required('invalid password repetition')
        .oneOf([Yup.ref('password')], 'Passwords must and should match'),
    // accept:Yup.boolean().oneOf([true],'Message'),
});