import Ajv from "ajv";
import { Type } from "@sinclair/typebox";
import addFormats from 'ajv-formats'
import addErrors from 'ajv-errors'
import { betterAjvErrors } from '@apideck/better-ajv-errors';

import { emailDTOSchema, nameDTOSchema, passwordDTOSchema, surnameDTOSchema } from "./dto-types.js";

const registerDTOSchema = Type.Object( {
    name: nameDTOSchema,
    surname: surnameDTOSchema,
    email: emailDTOSchema,
    password: passwordDTOSchema
},{
    additionalProperties: false,
    errorMessage: {
        additionalProperties: 'El formato no es adecuado.'
    }
});

const ajv = new Ajv( { allErrors: true} );
ajv.addFormat('password', /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/);

addFormats(ajv, ['email', 'uuid']).addKeyword('kind').addKeyword('modifier')
addErrors(ajv)

const validateSchema = ajv.compile(registerDTOSchema)

const userRegisterDTO = (req, res, next) => {
   
    const isDTOValid = validateSchema(req.body)

    const errors = betterAjvErrors(validateSchema, req.body);

    const newErrors = errors.map(error => {
       return {name: error.path.split('.')[1], message: error.message.split("'")[2]}
    })

    if(!isDTOValid) return res.status(400).json(newErrors)
    next();

}

export default userRegisterDTO;