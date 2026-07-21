import Joi from "joi";

const addServer = Joi.object({

    serverName: Joi.string()
        .trim()
        .max(150)
        .required(),

    serverCategoryId: Joi.number()
        .required(),

    serverStatusId: Joi.number()
        .required(),

    serverLocation: Joi.string()
        .trim()
        .max(150)
        .required(),

    hostName: Joi.string()
        .trim()
        .max(150)
        .required(),

    ipAddress: Joi.string()
        .trim()
        .max(50)
        .required(),

    operatingSystem: Joi.string()
        .trim()
        .max(150)
        .required(),

    ram: Joi.string()
        .trim()
        .max(50)
        .allow("", null),

    storage: Joi.string()
        .trim()
        .max(100)
        .allow("", null),

    processor: Joi.string()
        .trim()
        .max(150)
        .allow("", null),

    vendorId: Joi.number()
        .required(),

    purchaseDate: Joi.date()
        .allow(null),

    expiryDate: Joi.date()
        .allow(null),

    remarks: Joi.string()
        .trim()
        .max(500)
        .allow("", null)

});

const updateServer = Joi.object({

    serverName: Joi.string()
        .trim()
        .max(150),

    serverCategoryId: Joi.number(),

    serverStatusId: Joi.number(),

    serverLocation: Joi.string()
        .trim()
        .max(150),

    hostName: Joi.string()
        .trim()
        .max(150),

    ipAddress: Joi.string()
        .trim()
        .max(50),

    operatingSystem: Joi.string()
        .trim()
        .max(150),

    ram: Joi.string()
        .trim()
        .max(50)
        .allow("", null),

    storage: Joi.string()
        .trim()
        .max(100)
        .allow("", null),

    processor: Joi.string()
        .trim()
        .max(150)
        .allow("", null),

    vendorId: Joi.number(),

    purchaseDate: Joi.date()
        .allow(null),

    expiryDate: Joi.date()
        .allow(null),

    remarks: Joi.string()
        .trim()
        .max(500)
        .allow("", null),

    isActive: Joi.boolean()

});

export default {

    addServer,

    updateServer

};