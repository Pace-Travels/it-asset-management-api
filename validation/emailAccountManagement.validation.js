import Joi from "joi";

const addEmailAccount = Joi.object({

    emailAddress: Joi.string()
        .trim()
        .email()
        .max(150)
        .required(),

    employeeId: Joi.number()
        .required(),

    provider: Joi.string()
        .trim()
        .max(100)
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

const updateEmailAccount = Joi.object({

    emailAddress: Joi.string()
        .trim()
        .email()
        .max(150),

    employeeId: Joi.number(),

    provider: Joi.string()
        .trim()
        .max(100),

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

    addEmailAccount,

    updateEmailAccount

};