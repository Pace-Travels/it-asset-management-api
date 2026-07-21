import model from "../models/index.js";
import validation from "../validation/domainWebsiteManagement.validation.js";

import { ReE, ReS } from "../services/util.service.js";
import { getPaginatedData } from "../services/common/pagination.service.js";

import MESSAGE from "../constants/messages.js";

/* ===========================================================
    Add Domain & Website
=========================================================== */

const add = async (req, res) => {

    try {

        const { error } =
            validation.addDomainWebsite.validate(req.body);

        if (error) {

            return ReE(res, error.details[0].message, 422);

        }

        const {

            domainName,
            websiteUrl,
            hostingProvider,
            purchaseDate,
            expiryDate,
            renewalDate,
            renewalCost,
            serverId,
            statusId,
            remarks

        } = req.body;

        /* ==========================================
            Generate Domain Code
        ========================================== */

        const lastRecord =
            await model.DomainWebsiteManagement.findOne({

                order: [["id", "DESC"]]

            });

        let domainCode = "DOM000001";

        if (lastRecord) {

            domainCode =
                "DOM" +
                String(lastRecord.id + 1).padStart(6, "0");

        }

        /* ==========================================
            Duplicate Domain Check
        ========================================== */

        const domainExists =
            await model.DomainWebsiteManagement.findOne({

                where: {

                    domainName,

                    isDeleted: false

                }

            });

        if (domainExists) {

            return ReE(res, "Domain Name already exists.", 409);

        }

        /* ==========================================
            Create Domain
        ========================================== */

        const domain =
            await model.DomainWebsiteManagement.create({

                domainCode,

                domainName,

                websiteUrl,

                hostingProvider,

                purchaseDate,

                expiryDate,

                renewalDate,

                renewalCost,

                serverId,

                statusId,

                remarks

            });

        return ReS(res, {

            message: MESSAGE.CREATED,

            data: domain

        }, 201);

    }

    catch (error) {

        return ReE(res, error.message);

    }

};

export { add };

/* ===========================================================
    Fetch All Domain & Website
=========================================================== */

const fetchAll = async (req, res) => {

    try {

        const result = await getPaginatedData({

            model: model.DomainWebsiteManagement,

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

                }

            ],

            searchFields: [

                "domainCode",

                "domainName",

                "websiteUrl",

                "hostingProvider",

                "remarks"

            ],

            allowedSortFields: [

                "id",

                "domainCode",

                "domainName",

                "hostingProvider",

                "purchaseDate",

                "expiryDate",

                "renewalDate",

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
    Fetch Single Domain & Website
=========================================================== */

const fetchSingle = async (req, res) => {

    try {

        const domain = await model.DomainWebsiteManagement.findByPk(req.params.id,

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

                    }

                ]

            }
        );

        if (!domain || domain.isDeleted) {

            return ReE(res, MESSAGE.NOT_FOUND, 404);

        }

        return ReS(res, {

            message: MESSAGE.FETCHED,

            data: domain

        });

    }

    catch (error) {

        return ReE(res, error.message);

    }

};

export { fetchSingle };

/* ===========================================================
    Update Domain & Website
=========================================================== */

const update = async (req, res) => {

    try {

        const domain = await model.DomainWebsiteManagement.findByPk(req.params.id);

        if (!domain || domain.isDeleted) {

            return ReE(res, MESSAGE.NOT_FOUND, 404);

        }

        const { error } =
            validation.updateDomainWebsite.validate(req.body);

        if (error) {

            return ReE(res, error.details[0].message, 422);

        }

        const {

            domainName,
            websiteUrl,
            hostingProvider,
            purchaseDate,
            expiryDate,
            renewalDate,
            renewalCost,
            serverId,
            statusId,
            remarks

        } = req.body;

        const domainExists =
            await model.DomainWebsiteManagement.findOne({

                where: {

                    domainName,

                    isDeleted: false

                }

            });

        if (domainExists && domainExists.id !== domain.id) {

            return ReE(res, "Domain Name already exists.", 409);

        }

        await domain.update({

            domainName,

            websiteUrl,

            hostingProvider,

            purchaseDate,

            expiryDate,

            renewalDate,

            renewalCost,

            serverId,

            statusId,

            remarks

        });

        return ReS(res, {

            message: MESSAGE.UPDATED,

            data: domain

        });

    }

    catch (error) {

        return ReE(res, error.message);

    }

};

export { update };


/* ===========================================================
    Remove Domain & Website
=========================================================== */

const remove = async (req, res) => {

    try {

        const domain = await model.DomainWebsiteManagement.findByPk(req.params.id);

        if (!domain || domain.isDeleted) {

            return ReE(res, MESSAGE.NOT_FOUND, 404);

        }

        await domain.update({

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
    Change Domain & Website Status
=========================================================== */

const changeStatus = async (req, res) => {

    try {

        const domain = await model.DomainWebsiteManagement.findByPk(req.params.id);

        if (!domain || domain.isDeleted) {

            return ReE(res, MESSAGE.NOT_FOUND, 404);

        }

        await domain.update({

            isActive: !domain.isActive

        });

        return ReS(res, {

            message: "Domain Status Updated Successfully",

            data: domain

        });

    }

    catch (error) {

        return ReE(res, error.message);

    }

};

export { changeStatus };