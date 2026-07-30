import Joi from "joi";

const addMenu = Joi.object({

    parentId: Joi.number()
        .integer()
        .allow(null),

    name: Joi.string()
        .trim()
        .max(150)
        .required(),

    route: Joi.string()
        .trim()
        .max(255)
        .allow("", null),

    icon: Joi.string()
        .trim()
        .max(100)
        .allow("", null),

    sortOrder: Joi.number()
        .integer()
        .min(0)
        .default(0)

});

const updateMenu = Joi.object({

    parentId: Joi.number()
        .integer()
        .allow(null),

    name: Joi.string()
        .trim()
        .max(150),

    route: Joi.string()
        .trim()
        .max(255)
        .allow("", null),

    icon: Joi.string()
        .trim()
        .max(100)
        .allow("", null),

    sortOrder: Joi.number()
        .integer()
        .min(0),

    isActive: Joi.boolean()

});

export default {

    addMenu,

    updateMenu

};