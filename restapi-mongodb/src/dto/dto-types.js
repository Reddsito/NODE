import { Type } from "@sinclair/typebox";

export const idDTOSchema = Type.String({
    format: 'uuid',
    errorMessage: {
        type: 'El tipo de _id no es válido, debe ser un string',
        format: 'El formato de _id no es válido, debe ser un uuid4'
    }
})
export const nameDTOSchema = Type.String({
    minLength: 2,
    maxLength: 25,
    errorMessage: {
        minLength: 'El name debe tener mínimo 2 caracteres de longitud',
        maxLength: 'El name debe tener máximo 25 caracteres de longitud'
    }
})
export const surnameDTOSchema = Type.String({
    minLength: 4,
    maxLength: 50,
    errorMessage: {
        minLength: 'El surname debe tener mínimo 4 caracteres de longitud',
        maxLength: 'El surname debe tener máximo 50 caracteres de longitud'
    }
})
export const emailDTOSchema = Type.String({
    format: 'email',
    errorMessage: {
        type: 'El tipo de email no es válido, debe ser un string',
        format: 'El formato del email no es válido'
    }
})
export const passwordDTOSchema = Type.String({
    format: 'password', 
    minLength: 10,
    maxLength: 25,
    errorMessage: {
        type: 'Tipo de contraseña incorrecta, debe ser un string',
        format: 'Formato incorrecto, debe contener una mayúscula, una minúscula, y un número ',
        minLength: 'El mínimo de longitud es 10 caracteres',
        maxLength: 'El máximo de longitud es 25 caracteres'
    }
})




