import Joi from "joi";

const add = Joi.object({

    name: Joi.string()
        .trim()
        .max(100)
        .required(),

    description: Joi.string()
        .trim()
        .max(500)
        .allow("", null)

});

const update = Joi.object({

    name: Joi.string()
        .trim()
        .max(100),

    description: Joi.string()
        .trim()
        .max(500)
        .allow("", null),

    isActive: Joi.boolean()

});

export default {

    add,

    update

};