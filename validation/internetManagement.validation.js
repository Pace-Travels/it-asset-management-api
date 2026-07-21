import Joi from "joi";

const addInternet = Joi.object({

    ispName: Joi.string()
        .trim()
        .max(150)
        .required(),

    connectionType: Joi.string()
        .trim()
        .max(100)
        .required(),

    planName: Joi.string()
        .trim()
        .max(150)
        .required(),

    bandwidth: Joi.string()
        .trim()
        .max(100)
        .required(),

    contractStartDate: Joi.date()
        .required(),

    contractEndDate: Joi.date()
        .required(),

    renewalDate: Joi.date()
        .allow(null),

    monthlyCharges: Joi.number()
        .precision(2)
        .required(),

    remarks: Joi.string()
        .trim()
        .max(500)
        .allow("", null)

});

const updateInternet = Joi.object({

    ispName: Joi.string()
        .trim()
        .max(150),

    connectionType: Joi.string()
        .trim()
        .max(100),

    planName: Joi.string()
        .trim()
        .max(150),

    bandwidth: Joi.string()
        .trim()
        .max(100),

    contractStartDate: Joi.date(),

    contractEndDate: Joi.date(),

    renewalDate: Joi.date()
        .allow(null),

    monthlyCharges: Joi.number()
        .precision(2),

    remarks: Joi.string()
        .trim()
        .max(500)
        .allow("", null),

    isActive: Joi.boolean()

});

export default {

    addInternet,

    updateInternet

};