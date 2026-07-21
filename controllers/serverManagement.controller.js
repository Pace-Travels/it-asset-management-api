import { Op } from "sequelize";
import model from "../models/index.js";

import validation from "../validation/serverManagement.validation.js";

import { ReE, ReS } from "../services/util.service.js";
import { getPaginatedData } from "../services/common/pagination.service.js";

import MESSAGE from "../constants/messages.js";

/* ===========================================================
    Add Server
=========================================================== */

const add = async (req, res) => {

    try {
        const { error } = validation.addServer.validate(req.body);
        if (error) {
            return ReE(res, error.details[0].message, 422);
        }

        const {

            serverName,
            serverCategoryId,
            serverStatusId,
            serverLocation,
            hostName,
            ipAddress,
            operatingSystem,
            ram,
            storage,
            processor,
            vendorId,
            purchaseDate,
            expiryDate,
            remarks

        } = req.body;

        /* ==========================================
            Generate Server Code
        ========================================== */

        const lastServer = await model.ServerManagement.findOne({
            order: [["id", "DESC"]]
        });

        let serverCode = "SRV000001";

        if (lastServer) {
            serverCode =
                "SRV" +
                String(lastServer.id + 1).padStart(6, "0");
        }

        /* ==========================================
            Duplicate Host Name
        ========================================== */

        const hostExists =
            await model.ServerManagement.findOne({
                where: {
                    hostName,
                    isDeleted: false
                }
            });

        if (hostExists) {
            return ReE(res, "Host Name already exists.", 409);
        }

        /* ==========================================
            Duplicate IP Address
        ========================================== */

        const ipExists =
            await model.ServerManagement.findOne({
                where: {
                    ipAddress,
                    isDeleted: false
                }
            });

        if (ipExists) {
            return ReE(res, "IP Address already exists.", 409);
        }

        /* ==========================================
            Create Server
        ========================================== */

        const server =
            await model.ServerManagement.create({

                serverCode,
                serverName,
                serverCategoryId,
                serverStatusId,
                serverLocation,
                hostName,
                ipAddress,
                operatingSystem,
                ram,
                storage,
                processor,
                vendorId,
                purchaseDate,
                expiryDate,
                remarks

            });

        return ReS(res, {
            message: MESSAGE.CREATED,
            data: server
        }, 201);
    }

    catch (error) {
        return ReE(res, error.message);
    }

};

export { add };

/* ===========================================================
    Fetch All Servers
=========================================================== */

const fetchAll = async (req, res) => {

    try {

        const result = await getPaginatedData({
            model: model.ServerManagement,
            query: req.query,
            include: [
                {
                    model: model.VendorManagement,
                    as: "vendor",
                    attributes: [
                        "id",
                        "vendorCode",
                        "vendorName"
                    ]
                },
                {
                    model: model.ServerCategoryMaster,
                    as: "serverCategory",
                    attributes: [
                        "id",
                        "categoryName"
                    ]
                }
            ],
            searchFields: [

                "serverCode",
                "serverName",
                "hostName",
                "ipAddress",
                "operatingSystem",
                "serverLocation"
            ],

            allowedSortFields: [
                "id",
                "serverCode",
                "serverName",
                "hostName",
                "ipAddress",
                "serverLocation",
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


/* ===========================================================
    Fetch Single Server
=========================================================== */

const fetchSingle = async (req, res) => {

    try {

        const server = await model.ServerManagement.findByPk(req.params.id,
            {
                include: [
                    {
                        model: model.VendorManagement,
                        as: "vendor",
                        attributes: [
                            "id",
                            "vendorCode",
                            "vendorName"
                        ]
                    },
                    {
                        model: model.ServerCategoryMaster,
                        as: "serverCategory",
                        attributes: [
                            "id",
                            "categoryName"
                        ]
                    }
                ]
            }
        );
        if (!server || server.isDeleted) {
            return ReE(res, MESSAGE.NOT_FOUND, 404);
        }

        return ReS(res, {
            message: MESSAGE.FETCHED,
            data: server
        });
    }

    catch (error) {
        return ReE(res, error.message);
    }
};

export { fetchSingle };

/* ===========================================================
    Update Server
=========================================================== */

const update = async (req, res) => {

    try {

        const server = await model.ServerManagement.findByPk(req.params.id);
        if (!server || server.isDeleted) {
            return ReE(res, MESSAGE.NOT_FOUND, 404);
        }
        const { error } = validation.updateServer.validate(req.body);
        if (error) {
            return ReE(res, error.details[0].message, 422);
        }

        const {

            serverName,
            serverCategoryId,
            serverStatusId,
            serverLocation,
            hostName,
            ipAddress,
            operatingSystem,
            ram,
            storage,
            processor,
            vendorId,
            purchaseDate,
            expiryDate,
            remarks

        } = req.body;

        /* ==========================================
            Duplicate Host Name
        ========================================== */

        const hostExists = await model.ServerManagement.findOne({
            where: {
                hostName,
                id: {
                    [Op.ne]: req.params.id
                },
                isDeleted: false
            }

        });

        if (hostExists) {
            return ReE(res, "Host Name already exists.", 409);
        }

        /* ==========================================
            Duplicate IP Address
        ========================================== */

        const ipExists = await model.ServerManagement.findOne({
            where: {
                ipAddress,
                id: {
                    [Op.ne]: req.params.id
                },
                isDeleted: false
            }
        });

        if (ipExists) {
            return ReE(res, "IP Address already exists.", 409);
        }

        await server.update({
            serverName,
            serverCategoryId,
            serverStatusId,
            serverLocation,
            hostName,
            ipAddress,
            operatingSystem,
            ram,
            storage,
            processor,
            vendorId,
            purchaseDate,
            expiryDate,
            remarks
        });

        return ReS(res, {
            message: MESSAGE.UPDATED,
            data: server
        });
    }

    catch (error) {
        return ReE(res, error.message);
    }

};

export { update };


/* ===========================================================
    Remove Server (Soft Delete)
=========================================================== */

const remove = async (req, res) => {

    try {

        const server = await model.ServerManagement.findByPk(req.params.id);
        if (!server || server.isDeleted) {
            return ReE(res, MESSAGE.NOT_FOUND, 404);
        }

        await server.update({
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


/* ===========================================================
    Change Server Status
=========================================================== */

const changeStatus = async (req, res) => {

    try {
        const server = await model.ServerManagement.findByPk(req.params.id);
        if (!server || server.isDeleted) {
            return ReE(res, MESSAGE.NOT_FOUND, 404);
        }

        await server.update({
            isActive: !server.isActive
        });

        return ReS(res, {
            message: "Server Status Updated Successfully",
            data: server
        });
    }

    catch (error) {
        return ReE(res, error.message);
    }

};

export { changeStatus };