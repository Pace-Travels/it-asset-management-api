import Joi from "joi";

const addAssetInformation = Joi.object({

    assetCode: Joi.string()
        .trim()
        .max(50)
        .required(),

    assetName: Joi.string()
        .trim()
        .max(200)
        .required(),

    categoryId: Joi.number()
        .integer()
        .required(),

    brand: Joi.string()
        .trim()
        .max(100)
        .allow("", null),

    modelNumber: Joi.string()
        .trim()
        .max(100)
        .allow("", null),

    serialNumber: Joi.string()
        .trim()
        .max(100)
        .required(),

    purchaseDate: Joi.date()
        .required(),

    purchaseCost: Joi.number()
        .min(0)
        .required(),

    vendorId: Joi.number()
        .integer()
        .required(),

    warrantyExpiryDate: Joi.date()
        .allow(null),

    assignedEmployeeId: Joi.number()
        .integer()
        .allow(null),

    departmentId: Joi.number()
        .integer()
        .allow(null),

    statusId: Joi.number()
        .integer()
        .required(),

    remarks: Joi.string()
        .trim()
        .max(1000)
        .allow("", null)

});

const updateAssetInformation = Joi.object({

    assetCode: Joi.string().trim().max(50),

    assetName: Joi.string().trim().max(200),

    categoryId: Joi.number().integer(),

    brand: Joi.string().trim().max(100).allow("", null),

    modelNumber: Joi.string().trim().max(100).allow("", null),

    serialNumber: Joi.string().trim().max(100),

    purchaseDate: Joi.date(),

    purchaseCost: Joi.number().min(0),

    vendorId: Joi.number().integer(),

    warrantyExpiryDate: Joi.date().allow(null),

    assignedEmployeeId: Joi.number().integer().allow(null),

    departmentId: Joi.number().integer().allow(null),

    statusId: Joi.number().integer(),

    remarks: Joi.string().trim().max(1000).allow("", null),

    isActive: Joi.boolean()

});

export default {

    addAssetInformation,
    updateAssetInformation

};