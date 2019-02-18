import Joi from 'joi';

export default {
    validateBody: (schema) => {
        return (req, res, next) => {
            const result = Joi.validate(req.body, schema);
            if (result.error) {
                return res.status(400).json({ status: 400, data: result.error });
            }
            if(!req.value) { req.value = {}; }
            req.value['body'] = result.value;
            next();
        }
    },

    schemas: {
        authSchema: Joi.object().keys({
            userId: Joi.number().required(),
            meetup: Joi.number().required(),
            title: Joi.string().required(),
            body: Joi.string().required(),
            votes: Joi.number().required(),

        })
    }
}