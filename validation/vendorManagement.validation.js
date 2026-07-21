import Joi from "joi";

const addVendor = Joi.object({

    vendorName: Joi.string()
        .trim()
        .min(2)
        .max(150)
        .required(),

    contactPerson: Joi.string()
        .trim()
        .max(100)
        .allow(null, ""),

    mobileNumber: Joi.string()
        .trim()
        .max(20)
        .allow(null, ""),

    email: Joi.string()
        .trim()
        .email()
        .allow(null, ""),

    gstNumber: Joi.string()
        .trim()
        .max(20)
        .allow(null, ""),

    panNumber: Joi.string()
        .trim()
        .max(20)
        .allow(null, ""),

    website: Joi.string()
        .trim()
        .max(255)
        .allow(null, ""),

    address: Joi.string()
        .trim()
        .max(500)
        .allow(null, ""),

    city: Joi.string()
        .trim()
        .max(100)
        .allow(null, ""),

    state: Joi.string()
        .trim()
        .max(100)
        .allow(null, ""),

    country: Joi.string()
        .trim()
        .max(100)
        .allow(null, ""),

    postalCode: Joi.string()
        .trim()
        .max(20)
        .allow(null, ""),

    remarks: Joi.string()
        .trim()
        .max(500)
        .allow(null, "")

});

const updateVendor = Joi.object({

    vendorName: Joi.string()
        .trim()
        .max(150),

    contactPerson: Joi.string()
        .trim()
        .max(100)
        .allow(null, ""),

    mobileNumber: Joi.string()
        .trim()
        .max(20)
        .allow(null, ""),

    email: Joi.string()
        .trim()
        .allow(null, ""),

    gstNumber: Joi.string()
        .trim()
        .max(20)
        .allow(null, ""),

    panNumber: Joi.string()
        .trim()
        .max(20)
        .allow(null, ""),

    website: Joi.string()
        .trim()
        .max(255)
        .allow(null, ""),

    address: Joi.string()
        .trim()
        .max(500)
        .allow(null, ""),

    city: Joi.string()
        .trim()
        .max(100)
        .allow(null, ""),

    state: Joi.string()
        .trim()
        .max(100)
        .allow(null, ""),

    country: Joi.string()
        .trim()
        .max(100)
        .allow(null, ""),

    postalCode: Joi.string()
        .trim()
        .max(20)
        .allow(null, ""),

    remarks: Joi.string()
        .trim()
        .max(500)
        .allow(null, ""),

    isActive: Joi.boolean()

});

export default {

    addVendor,
    updateVendor

};