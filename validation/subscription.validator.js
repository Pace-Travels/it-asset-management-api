import Joi from "joi";

const addSubscription = Joi.object({

    vendorId: Joi.number().integer().required(),

    description: Joi.string().trim().required(),

    amount: Joi.number().precision(2).positive().required(),

    paymentMethodId: Joi.number().integer().required(),

    reminderTypeId: Joi.number().integer().required(),

    reminderSentTo: Joi.string().trim().required(),

    expectedPaymentDate: Joi.date().required(),

    paymentInitiatedById: Joi.number().integer().required(),

    expiryDate: Joi.date().required(),

    paymentDate: Joi.date().required(),

    isActive: Joi.boolean().optional()

});

const update = Joi.object({

    vendorId: Joi.number().integer().optional(),

    description: Joi.string().trim().optional(),

    amount: Joi.number().precision(2).optional(),

    paymentMethodId: Joi.number().integer().optional(),

    reminderTypeId: Joi.number().integer().optional(),

    reminderSentTo: Joi.string().trim().optional(),

    expectedPaymentDate: Joi.date().optional(),

    paymentInitiatedById: Joi.number().integer().optional(),

    expiryDate: Joi.date().optional(),

    paymentDate: Joi.date().optional(),

    isActive: Joi.boolean().optional()

});

export default {

    addSubscription,

    update

};