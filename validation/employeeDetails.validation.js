import Joi from "joi";

const addEmployee = Joi.object({

    employeeId: Joi.string()
        .trim()
        .max(50)
        .required(),

    employeeName: Joi.string()
        .trim()
        .max(150)
        .required(),

    departmentId: Joi.number()
        .required(),

    designation: Joi.string()
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
        .min(10)
        .max(20)
        .required()

});

const updateEmployee = Joi.object({

    employeeId: Joi.string()
        .trim()
        .max(50),

    employeeName: Joi.string()
        .trim()
        .max(150),

    departmentId: Joi.number(),

    designation: Joi.string()
        .trim()
        .max(100),

    email: Joi.string()
        .trim()
        .email()
        .max(150),

    mobileNumber: Joi.string()
        .trim()
        .min(10)
        .max(20),

    isActive: Joi.boolean()

});

export default {

    addEmployee,

    updateEmployee

};