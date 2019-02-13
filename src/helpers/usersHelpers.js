import Joi from 'joi';

export default {
    validateBody: (schema) => {
        return (req, res, next) => {
            const result = Joi.validate(req.body, schema);
            if(result.error) {
                  // Unprocessable entity (INCOMPLETE PARAMETERS)
                return res.status(422).json({ status: 422, data: result.error });
            }
            if(!req.value) { req.value = {}; }
            req.value['body'] = result.value;
            next();
        }
    },

    schemas: {
        authSchemas: Joi.object().keys({
            firstName: Joi.string().required(), 
            lastName: Joi.string().required(),
            otherName: Joi.string().required(),
            email: Joi.string().email().required(),
            phoneNumber: Joi.number().required(),
            userName: Joi.string().required(),
            isAdmin: Joi.boolean().required(),
        })
    }
}