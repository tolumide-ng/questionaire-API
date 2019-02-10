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
            createdBy: Joi.string().min(3).required(),
            meetup: Joi.string().min(3).required(),
            title: Joi.string().min(5).required(),
            body: Joi.string().required(),
            votes: Joi.number().required(),

        })
    }
}