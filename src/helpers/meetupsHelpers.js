import Joi from 'joi';


export default {
    validateBody: (schema) => {
        return (req, res, next) => {
            const result = Joi.validate(req.body, schema);
            if(result.error){
                return res.status(422).json({status: 400, data: result.error});
            }
            if(!req.value) { req.value ={}; }
            req.value['body'] = result.value;
            next();
        }
    },

    schemas: {
        authSchema: Joi.object().keys({
            location: Joi.string().min(3).required(),
            topic: Joi.string().min(5).required(),
            happeningOn: Joi.date().min('now').required(),
            tags: Joi.array().unique().required(),
        })
    },
}
