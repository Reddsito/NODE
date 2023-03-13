import { Type } from "@sinclair/typebox";

export const idDTOSchema = Type.String({
    format: 'uuid',
    errorMessage: {
        type: 'El tipo de _id no es válido, debe ser un string.',
        format: 'El formato de _id no es válido, debe ser un uuid4.'
    }
})
export const nameDTOSchema = Type.String({
    minLength: 2,
    maxLength: 25,
    errorMessage: {
        minLength: 'The name must be at least 2 characters long.',
        maxLength: 'The name must be a maximum of 25 characters long.'
    }
})

export const surnameDTOSchema = Type.String({
    minLength: 4,
    maxLength: 50,
    errorMessage: {
        minLength: 'The surname must be at least 4 characters long.',
        maxLength: 'The surname must be a maximum of 50 characters long.'
    }
})
export const emailDTOSchema = Type.String({
    format: 'email',
    errorMessage: {
        type: 'The email type is not valid, it must be a string.',
        format: 'The email format is invalid.'
    }
})
export const passwordDTOSchema = Type.String({
    format: 'password', 
    minLength: 10,
    maxLength: 25,
    errorMessage: {
        format: 'Wrong password format, must contain an uppercase, a lowercase, and a number.',
        minLength: 'The minimum password length is 10 characters',
        maxLength: 'The maximum password length is 25 characters'
    }
})

    // Message

export const titleDTOSchema = Type.String({
    minLength: 4,
    maxLength: 35,
    errorMessage: {
        minLength: 'The title must be at least 4 characters long.',
        maxLength: 'The title must be a maximum of 35 characters long.'
    }
})
export const messageDTOSchema = Type.String({
    minLength: 4,
    maxLength: 500,
    errorMessage: {
        minLength: 'The message must be at least 4 characters long.',
        maxLength: 'The message must be a maximum of 500 characters long.'
    }
})
export const dateDTOSchema = Type.String({
    minLength: 1,
    maxLength: 35,
    errorMessage: {
        minLength: 'Date is necessary',
        format: 'Date bad format'
    }
})




