import Joi from "joi";

const addSoftwareLicense = Joi.object({

    softwareName: Joi.string()
        .trim()
        .max(150)
        .required(),

    softwareCategoryId: Joi.number()
        .required(),

    vendorId: Joi.number()
        .required(),

    licenseType: Joi.string()
        .trim()
        .max(100)
        .required(),

    numberOfUsers: Joi.number()
        .integer()
        .min(1)
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

    assignedUsers: Joi.number()
        .integer()
        .min(0)
        .required(),

    remarks: Joi.string()
        .trim()
        .max(500)
        .allow("", null)

});

const updateSoftwareLicense = Joi.object({

    softwareName: Joi.string()
        .trim()
        .max(150),

    softwareCategoryId: Joi.number(),

    vendorId: Joi.number(),

    licenseType: Joi.string()
        .trim()
        .max(100),

    numberOfUsers: Joi.number()
        .integer()
        .min(1),

    purchaseDate: Joi.date(),

    expiryDate: Joi.date(),

    renewalDate: Joi.date()
        .allow(null),

    renewalCost: Joi.number()
        .precision(2)
        .allow(null),

    assignedUsers: Joi.number()
        .integer()
        .min(0),

    remarks: Joi.string()
        .trim()
        .max(500)
        .allow("", null),

    isActive: Joi.boolean()

});

export default {

    addSoftwareLicense,

    updateSoftwareLicense

};