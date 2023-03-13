import Ajv from "ajv";
import { Type } from "@sinclair/typebox";
import addFormats from 'ajv-formats'
import addErrors from 'ajv-errors'
import {passwordDTOSchema} from "./dto-types.js";

const unregisterDTOSchema = Type.Object( {
    password: passwordDTOSchema
}, {
    additionalProperties: false,
    errorMessage: {
        additionalProperties: 'El formato del objeto no es válido.'
    }
});

const ajv = new Ajv( { allErrors: true} );
ajv.addFormat('password', /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/);

addFormats(ajv, ['email', 'uuid']).addKeyword('kind').addKeyword('modifier')
addErrors(ajv)

const validateSchema = ajv.compile(unregisterDTOSchema)

const userUnregisterDTO = (req, res, next) => {
    const isDTOValid = validateSchema(req.body)

    if(!isDTOValid) return res.status(400).send({errors: validateSchema.errors.map(error => error.message)})

    next();

}

export default userUnregisterDTO;