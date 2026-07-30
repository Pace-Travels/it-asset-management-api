import Joi from "joi";

const addRolePermission = Joi.object({

    roleId: Joi.number()
        .integer()
        .required(),

    menuId: Joi.number()
        .integer()
        .required(),

    permissionId: Joi.number()
        .integer()
        .required()

});

const updateRolePermission = Joi.object({

    roleId: Joi.number()
        .integer(),

    menuId: Joi.number()
        .integer(),

    permissionId: Joi.number()
        .integer(),

    isActive: Joi.boolean()

});

export default {

    addRolePermission,

    updateRolePermission

};