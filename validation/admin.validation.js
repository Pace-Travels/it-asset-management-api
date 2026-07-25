import Joi from "joi";

const addAdmin = Joi.object({

    employeeCode: Joi.string()
        .trim()
        .max(50)
        .required(),

    firstName: Joi.string()
        .trim()
        .max(100)
        .required(),

    lastName: Joi.string()
        .trim()
        .max(100)
        .required(),

    email: Joi.string()
        .trim()
        .email()
        .max(150)
        .required(),

    mobileNumber: Joi.string()
        .trim()
        .max(15)
        .required(),

    password: Joi.string()
        .pattern(
            new RegExp(
                '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&.#^()_+=\\-])[A-Za-z\\d@$!%*?&.#^()_+=\\-]{12}$'
            )
        )
        .required()
        .messages({
            "string.empty": "Password is required.",
            "string.pattern.base":
                "Password must be exactly 12 characters and contain at least one uppercase letter, one lowercase letter, one number and one special character."
        }),

    profileImage: Joi.string()
        .trim()
        .allow("", null),

    userRoleId: Joi.number()
        .integer()
        .required(),

    userTypeId: Joi.number()
        .integer()
        .required(),

    departmentId: Joi.number()
        .integer()
        .required(),

    adminStatusId: Joi.number()
        .integer()
        .required()

});

const updateAdmin = Joi.object({

    employeeCode: Joi.string()
        .trim()
        .max(50),

    firstName: Joi.string()
        .trim()
        .max(100),

    lastName: Joi.string()
        .trim()
        .max(100),

    mobileNumber: Joi.string()
        .trim()
        .max(15),

    profileImage: Joi.string()
        .trim()
        .allow("", null),

    userRoleId: Joi.number()
        .integer(),

    userTypeId: Joi.number()
        .integer(),

    departmentId: Joi.number()
        .integer(),

    adminStatusId: Joi.number()
        .integer(),

    isActive: Joi.boolean()

});

export default {

    addAdmin,
    updateAdmin

};