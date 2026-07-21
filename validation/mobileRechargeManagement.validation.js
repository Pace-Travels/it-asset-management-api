import Joi from "joi";

const addMobileRecharge = Joi.object({

    mobileNumber: Joi.string()
        .trim()
        .max(20)
        .required(),

    assignedEmployee: Joi.string()
        .trim()
        .max(150)
        .required(),

    serviceProvider: Joi.string()
        .trim()
        .max(100)
        .required(),

    rechargeAmount: Joi.number()
        .precision(2)
        .required(),

    rechargeDate: Joi.date()
        .required(),

    validityPeriod: Joi.string()
        .trim()
        .max(50)
        .required(),

    nextRechargeDate: Joi.date()
        .required(),

    statusId: Joi.number()
        .required(),

    remarks: Joi.string()
        .trim()
        .max(500)
        .allow("", null)

});

const updateMobileRecharge = Joi.object({

    mobileNumber: Joi.string()
        .trim()
        .max(20),

    assignedEmployee: Joi.string()
        .trim()
        .max(150),

    serviceProvider: Joi.string()
        .trim()
        .max(100),

    rechargeAmount: Joi.number()
        .precision(2),

    rechargeDate: Joi.date(),

    validityPeriod: Joi.string()
        .trim()
        .max(50),

    nextRechargeDate: Joi.date(),

    statusId: Joi.number(),

    remarks: Joi.string()
        .trim()
        .max(500)
        .allow("", null),

    isActive: Joi.boolean()

});

export default {

    addMobileRecharge,

    updateMobileRecharge

};