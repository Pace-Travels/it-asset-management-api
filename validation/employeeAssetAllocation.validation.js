import Joi from "joi";

const addEmployeeAssetAllocation = Joi.object({

    employeeId: Joi.number()
        .required(),

    assetId: Joi.number()
        .required(),

    allocatedDate: Joi.date()
        .required(),

    returnDate: Joi.date()
        .allow(null),

    allocationStatus: Joi.string()
        .trim()
        .max(50)
        .required(),

    remarks: Joi.string()
        .trim()
        .max(500)
        .allow("", null)

});

const updateEmployeeAssetAllocation = Joi.object({

    employeeId: Joi.number(),

    assetId: Joi.number(),

    allocatedDate: Joi.date(),

    returnDate: Joi.date()
        .allow(null),

    allocationStatus: Joi.string()
        .trim()
        .max(50),

    remarks: Joi.string()
        .trim()
        .max(500)
        .allow("", null),

    isActive: Joi.boolean()

});

export default {

    addEmployeeAssetAllocation,

    updateEmployeeAssetAllocation

};