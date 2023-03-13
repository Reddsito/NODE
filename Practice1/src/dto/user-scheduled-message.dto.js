import Ajv from "ajv";
import { Type } from "@sinclair/typebox";
import addFormats from 'ajv-formats'
import addErrors from 'ajv-errors'
import { emailDTOSchema, titleDTOSchema, dateDTOSchema, messageDTOSchema} from "./dto-types.js";
import { betterAjvErrors } from '@apideck/better-ajv-errors';

const scheduledMessageDTOSchema = Type.Object( {
    addressee: emailDTOSchema,
    title: titleDTOSchema,
    date: dateDTOSchema,
    message: messageDTOSchema
},{
    additionalProperties: false,
    errorMessage: {
        additionalProperties: 'The object format is incorrect'
    }
});

const ajv = new Ajv( {allErrors: true} );
addFormats(ajv, ['email']).addKeyword('kind').addKeyword('modifier')
addErrors(ajv);

const validateSchema = ajv.compile(scheduledMessageDTOSchema)

const scheduledMessageDataDTO = (req, res, next) => {
    const isDTOValid = validateSchema(req.body)

    const errors = betterAjvErrors(validateSchema, req.body);

    const newErrors = errors.map(error => {
       return {name: error.path.split('.')[1], message: error.message.split("'")[2]}
    }).filter(error => error.message )


    if(!isDTOValid) return res.status(400).json(newErrors[0])

    next();

}

export default scheduledMessageDataDTO;