import Joi from "joi";

const addCloudSubscription = Joi.object({

    serviceName: Joi.string()
        .trim()
        .max(150)
        .required(),

    subscriptionType: Joi.string()
        .trim()
        .max(100)
        .required(),

    renewalDate: Joi.date()
        .allow(null),

    monthlyYearlyCost: Joi.number()
        .precision(2)
        .allow(null),

    accountOwner: Joi.string()
        .trim()
        .max(150)
        .required(),

    remarks: Joi.string()
        .trim()
        .max(500)
        .allow("", null)

});

const updateCloudSubscription = Joi.object({

    serviceName: Joi.string()
        .trim()
        .max(150),

    subscriptionType: Joi.string()
        .trim()
        .max(100),

    renewalDate: Joi.date()
        .allow(null),

    monthlyYearlyCost: Joi.number()
        .precision(2)
        .allow(null),

    accountOwner: Joi.string()
        .trim()
        .max(150),

    remarks: Joi.string()
        .trim()
        .max(500)
        .allow("", null),

    isActive: Joi.boolean()

});

export default {

    addCloudSubscription,

    updateCloudSubscription

};