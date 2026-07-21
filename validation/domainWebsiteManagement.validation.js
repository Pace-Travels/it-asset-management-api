import Joi from "joi";

const addDomainWebsite = Joi.object({

    domainName: Joi.string()
        .trim()
        .max(150)
        .required(),

    websiteUrl: Joi.string()
        .trim()
        .max(255)
        .required(),

    hostingProvider: Joi.string()
        .trim()
        .max(150)
        .required(),

    purchaseDate: Joi.date()
        .required(),

    expiryDate: Joi.date()
        .required(),

    renewalDate: Joi.date()
        .allow(null),

    renewalCost: Joi.number()
        .precision(2)
        .allow(null),

    serverId: Joi.number()
        .required(),

    statusId: Joi.number()
        .required(),

    remarks: Joi.string()
        .trim()
        .max(500)
        .allow("", null)

});

const updateDomainWebsite = Joi.object({

    domainName: Joi.string()
        .trim()
        .max(150),

    websiteUrl: Joi.string()
        .trim()
        .max(255),

    hostingProvider: Joi.string()
        .trim()
        .max(150),

    purchaseDate: Joi.date(),

    expiryDate: Joi.date(),

    renewalDate: Joi.date()
        .allow(null),

    renewalCost: Joi.number()
        .precision(2)
        .allow(null),

    serverId: Joi.number(),

    statusId: Joi.number(),

    remarks: Joi.string()
        .trim()
        .max(500)
        .allow("", null),

    isActive: Joi.boolean()

});

export default {

    addDomainWebsite,

    updateDomainWebsite

};