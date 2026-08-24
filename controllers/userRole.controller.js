import model from '../models/index.js';
import { ReE, ReS } from '../services/util.service.js';
import validation from '../validation/userRole.validation.js';
import MESSAGE from '../constants/messages.js';
import { getPaginatedData } from "../services/common/pagination.service.js";

/**
 * Add User Role
 */
const add = async (req, res) => {

    try {

        const { error } = validation.addUserRole.validate(req.body);

        if (error) {
            return ReE(res, error.details[0].message, 422);
        }

        const {
            name,
            code,
            description,
            userRoleStatusId
        } = req.body;

        const nameExists = await model.UserRole.findOne({
            where: {
                name,
                isDeleted: false
            }
        });

        if (nameExists) {
            return ReE(res, "User Role Name already exists.", 409);
        }

        const codeExists = await model.UserRole.findOne({
            where: {
                code,
                isDeleted: false
            }
        });

        if (codeExists) {
            return ReE(res, "User Role Code already exists.", 409);
        }

        const userRole = await model.UserRole.create({
            name,
            code,
            description,
            userRoleStatusId
        });

        return ReS(res, {
            message: MESSAGE.CREATED,
            data: userRole
        }, 201);

    } catch (error) {
        return ReE(res, error.message);
    }

};

export { add };

/**
 * Get All User Roles
 */
const fetchAll = async (req, res) => {

    try {

        const result = await getPaginatedData({
            model: model.UserRole,
            query: req.query,
            include: [
                {
                    model: model.UserRoleStatus,
                    as: "status",
                    attributes: [
                        "id",
                        "name",
                    ]
                }
            ],
            searchFields: [
                "name",
                "description"
            ],
            allowedSortFields: [
                "id",
                "name",
                "code",
                "createdAt",
                "updatedAt"
            ]
        });

        return ReS(res, {
            message: MESSAGE.FETCHED,
            ...result
        });

    } catch (error) {
        return ReE(res, error.message);
    }

};

export { fetchAll };

/**
 * Get Single User Role
 */
const fetchSingle = async (req, res) => {

    try {

        const userRole = await model.UserRole.findByPk(req.params.id, {
            include: [
                {
                    model: model.UserRoleStatus,
                    as: "status",
                    attributes: [
                        "id",
                        "name",
                    ]
                }
            ]
        });

        if (!userRole || userRole.isDeleted) {
            return ReE(res, MESSAGE.NOT_FOUND, 404);
        }

        return ReS(res, {
            data: userRole
        });

    } catch (error) {
        return ReE(res, error.message);
    }

};

export { fetchSingle };

/**
 * Update User Role
 */
const update = async (req, res) => {

    try {

        const userRole = await model.UserRole.findByPk(req.params.id);

        if (!userRole || userRole.isDeleted) {
            return ReE(res, MESSAGE.NOT_FOUND, 404);
        }

        const { error } = validation.updateUserRole.validate(req.body);

        if (error) {
            return ReE(res, error.details[0].message, 422);
        }

        const {
            name,
            code,
            description,
            userRoleStatusId
        } = req.body;

        const nameExists = await model.UserRole.findOne({
            where: {
                name,
                isDeleted: false,
                id: { [model.Sequelize.Op.ne]: req.params.id }
            }
        });

        if (nameExists) {
            return ReE(res, "User Role Name already exists.", 409);
        }

        const codeExists = await model.UserRole.findOne({
            where: {
                code,
                isDeleted: false,
                id: { [model.Sequelize.Op.ne]: req.params.id }
            }
        });

        if (codeExists) {
            return ReE(res, "User Role Code already exists.", 409);
        }

        await userRole.update({
            name,
            code,
            description,
            userRoleStatusId
        });

        return ReS(res, {
            message: MESSAGE.UPDATED,
            data: userRole
        });

    } catch (error) {
        return ReE(res, error.message);
    }

};

export { update };

/**
 * Soft Delete User Role
 */
const remove = async (req, res) => {

    try {

        const userRole = await model.UserRole.findByPk(req.params.id);

        if (!userRole || userRole.isDeleted) {
            return ReE(res, MESSAGE.NOT_FOUND, 404);
        }

        await userRole.update({
            isDeleted: true,
            isActive: false
        });

        return ReS(res, {
            message: MESSAGE.DELETED
        });

    } catch (error) {
        return ReE(res, error.message);
    }

};

export { remove };

/**
 * Change Status
 */
const changeStatus = async (req, res) => {

    try {

        const userRole = await model.UserRole.findByPk(req.params.id);

        if (!userRole || userRole.isDeleted) {
            return ReE(res, MESSAGE.NOT_FOUND, 404);
        }

        await userRole.update({
            isActive: !userRole.isActive
        });

        return ReS(res, {
            message: "Status Updated Successfully",
            data: userRole
        });

    } catch (error) {
        return ReE(res, error.message);
    }

};

export { changeStatus };