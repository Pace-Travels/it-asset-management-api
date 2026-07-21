import Joi from "joi";

const addSSLCertificate = Joi.object({

    domainId: Joi.number()
        .required(),

    certificateProvider: Joi.string()
        .trim()
        .max(150)
        .required(),

    certificateType: Joi.string()
        .trim()
        .max(100)
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

    statusId: Joi.number()
        .required(),

    remarks: Joi.string()
        .trim()
        .max(500)
        .allow("", null)

});

const updateSSLCertificate = Joi.object({

    domainId: Joi.number(),

    certificateProvider: Joi.string()
        .trim()
        .max(150),

    certificateType: Joi.string()
        .trim()
        .max(100),

    purchaseDate: Joi.date(),

    expiryDate: Joi.date(),

    renewalDate: Joi.date()
        .allow(null),

    renewalCost: Joi.number()
        .precision(2)
        .allow(null),

    statusId: Joi.number(),

    remarks: Joi.string()
        .trim()
        .max(500)
        .allow("", null),

    isActive: Joi.boolean()

});

export default {

    addSSLCertificate,

    updateSSLCertificate

};