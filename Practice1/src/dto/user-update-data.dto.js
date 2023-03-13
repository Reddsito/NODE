import Ajv from "ajv";
import { Type } from "@sinclair/typebox";
import addErrors from 'ajv-errors'
import { nameDTOSchema, surnameDTOSchema } from "./dto-types.js";

const updateDataDTOSchema = Type.Object( {
    name: nameDTOSchema,
    surname: surnameDTOSchema,
},{
    additionalProperties: false,
    errorMessage: {
        additionalProperties: 'El formato del objeto no es válido.'
    }
});

const ajv = new Ajv( {allErrors: true} );
addErrors(ajv);

const validateSchema = ajv.compile(updateDataDTOSchema)

const userUpdateDataDTO = (req, res, next) => {
    const isDTOValid = validateSchema(req.body)

    if(!isDTOValid) return res.status(400).send({errors: validateSchema.errors.map(error => error.message)})

    next();

}

export default userUpdateDataDTO;