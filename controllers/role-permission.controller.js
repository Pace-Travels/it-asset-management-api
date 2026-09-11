import model from "../models/index.js";
import { ReE, ReS } from "../services/util.service.js";
import validation from "../validation/role-permission.validation.js";
import MESSAGE from "../constants/messages.js";
import { getPaginatedData } from "../services/common/pagination.service.js";

const add = async (req, res) => {

    try {

        const { error } = validation.addRolePermission.validate(req.body);

        if (error) {

            return ReE(res, error.details[0].message, 422);

        }

        const {

            roleId,
            menuId,
            permissionId

        } = req.body;

        const role = await model.UserRole.findOne({

            where: {

                id: roleId,

                isDeleted: false

            }

        });

        if (!role) {

            return ReE(res, "Role not found.", 404);

        }

        const menu = await model.Menu.findOne({

            where: {

                id: menuId,

                isDeleted: false

            }

        });

        if (!menu) {

            return ReE(res, "Menu not found.", 404);

        }

        const permission = await model.Permission.findOne({

            where: {

                id: permissionId,

                isDeleted: false

            }

        });

        if (!permission) {

            return ReE(res, "Permission not found.", 404);

        }

        const mappingExists = await model.RolePermission.findOne({

            where: {

                roleId,

                menuId,

                permissionId,

                isDeleted: false

            }

        });

        if (mappingExists) {

            return ReE(res, "Role Permission already exists.", 409);

        }

        const rolePermission = await model.RolePermission.create({

            roleId,

            menuId,

            permissionId

        });

        return ReS(res, {

            message: MESSAGE.CREATED,

            data: rolePermission

        }, 201);

    }

    catch (error) {

        return ReE(res, error.message);

    }

};

export { add };

const fetchAll = async (req, res) => {

    try {

        const result = await getPaginatedData({

            model: model.RolePermission,

            query: req.query,

            include: [

                {

                    model: model.UserRole,

                    as: "role",

                    attributes: [

                        "id",

                        "name"

                    ]

                },

                {

                    model: model.Menu,

                    as: "menu",

                    attributes: [

                        "id",

                        "name",

                        "route"

                    ]

                },

                {

                    model: model.Permission,

                    as: "permission",

                    attributes: [

                        "id",

                        "name"

                    ]

                }

            ],

            searchFields: [],

            allowedSortFields: [

                "id",

                "createdAt"

            ]

        });

        return ReS(res, {

            message: MESSAGE.FETCHED,

            ...result

        });

    }

    catch (error) {

        return ReE(res, error.message);

    }

};

export { fetchAll };


const fetchSingle = async (req, res) => {

    try {

        const rolePermission = await model.RolePermission.findByPk(req.params.id, {

            include: [

                {

                    model: model.UserRole,

                    as: "userRole"

                },

                {

                    model: model.Menu,

                    as: "menu"

                },

                {

                    model: model.Permission,

                    as: "permission"

                }

            ]

        });

        if (!rolePermission || rolePermission.isDeleted) {

            return ReE(res, MESSAGE.NOT_FOUND, 404);

        }

        return ReS(res, {

            data: rolePermission

        });

    }

    catch (error) {

        return ReE(res, error.message);

    }

};

export { fetchSingle };


const update = async (req, res) => {

    try {

        const rolePermission = await model.RolePermission.findByPk(req.params.id);

        if (!rolePermission || rolePermission.isDeleted) {

            return ReE(res, MESSAGE.NOT_FOUND, 404);

        }

        const { error } = validation.updateRolePermission.validate(req.body);

        if (error) {

            return ReE(res, error.details[0].message);

        }

        const {

            roleId,
            menuId,
            permissionId

        } = req.body;

        if (roleId) {

            const role = await model.UserRole.findOne({

                where: {

                    id: roleId,

                    isDeleted: false

                }

            });

            if (!role) {

                return ReE(res, "Role not found.", 404);

            }

        }

        if (menuId) {

            const menu = await model.Menu.findOne({

                where: {

                    id: menuId,

                    isDeleted: false

                }

            });

            if (!menu) {

                return ReE(res, "Menu not found.", 404);

            }

        }

        if (permissionId) {

            const permission = await model.Permission.findOne({

                where: {

                    id: permissionId,

                    isDeleted: false

                }

            });

            if (!permission) {

                return ReE(res, "Permission not found.", 404);

            }

        }

        const duplicate = await model.RolePermission.findOne({

            where: {

                roleId: roleId || rolePermission.roleId,

                menuId: menuId || rolePermission.menuId,

                permissionId: permissionId || rolePermission.permissionId,

                isDeleted: false

            }

        });

        if (duplicate && duplicate.id !== rolePermission.id) {

            return ReE(res, "Role Permission already exists.", 409);

        }

        await rolePermission.update(req.body);

        return ReS(res, {

            message: MESSAGE.UPDATED,

            data: rolePermission

        });

    }

    catch (error) {

        return ReE(res, error.message);

    }

};

export { update };


const remove = async (req, res) => {

    try {

        const rolePermission = await model.RolePermission.findByPk(req.params.id);

        if (!rolePermission || rolePermission.isDeleted) {

            return ReE(res, MESSAGE.NOT_FOUND, 404);

        }

        await rolePermission.update({

            isDeleted: true,

            isActive: false

        });

        return ReS(res, {

            message: MESSAGE.DELETED

        });

    }

    catch (error) {

        return ReE(res, error.message);

    }

};

export { remove };


const changeStatus = async (req, res) => {

    try {

        const rolePermission = await model.RolePermission.findByPk(req.params.id);

        if (!rolePermission || rolePermission.isDeleted) {

            return ReE(res, MESSAGE.NOT_FOUND, 404);

        }

        await rolePermission.update({

            isActive: !rolePermission.isActive

        });

        return ReS(res, {

            message: "Status Updated Successfully",

            data: rolePermission

        });

    }

    catch (error) {

        return ReE(res, error.message);

    }

};

export { changeStatus };