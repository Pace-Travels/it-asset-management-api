import Joi from "joi";

const addUserRole = Joi.object({

    name: Joi.string()
        .trim()
        .max(100)
        .required(),

    code: Joi.string()
        .trim()
        .max(100)
        .required(),

    description: Joi.string()
        .trim()
        .max(500)
        .allow("", null),

    userRoleStatusId: Joi.number()
        .integer()
        .required()

});

const updateUserRole = Joi.object({

    name: Joi.string()
        .trim()
        .max(100),

    code: Joi.string()
        .trim()
        .max(100),

    description: Joi.string()
        .trim()
        .max(500)
        .allow("", null),

    userRoleStatusId: Joi.number()
        .integer(),

    isActive: Joi.boolean()

});

export default {

    addUserRole,
    updateUserRole

};