import model from "../models/index.js";
import validation from "../validation/softwareLicenseManagement.validation.js";

import { ReE, ReS } from "../services/util.service.js";
import { getPaginatedData } from "../services/common/pagination.service.js";

import MESSAGE from "../constants/messages.js";

/* ===========================================================
    Add Software License
=========================================================== */

const add = async (req, res) => {

    try {

        const { error } =
            validation.addSoftwareLicense.validate(req.body);

        if (error) {

            return ReE(res, error.details[0].message, 422);

        }

        const {

            softwareName,
            softwareCategoryId,
            vendorId,
            licenseType,
            numberOfUsers,
            purchaseDate,
            expiryDate,
            renewalDate,
            renewalCost,
            assignedUsers,
            remarks

        } = req.body;

        /* ==========================================
            Generate License Code
        ========================================== */

        const lastLicense =
            await model.SoftwareLicenseManagement.findOne({

                order: [["id", "DESC"]]

            });

        let licenseCode = "LIC000001";

        if (lastLicense) {

            licenseCode =
                "LIC" +
                String(lastLicense.id + 1).padStart(6, "0");

        }

        /* ==========================================
            Create License
        ========================================== */

        const license =
            await model.SoftwareLicenseManagement.create({

                licenseCode,

                softwareName,

                softwareCategoryId,

                vendorId,

                licenseType,

                numberOfUsers,

                purchaseDate,

                expiryDate,

                renewalDate,

                renewalCost,

                assignedUsers,

                remarks

            });

        return ReS(res, {

            message: MESSAGE.CREATED,

            data: license

        }, 201);

    }

    catch (error) {

        return ReE(res, error.message);

    }

};

export { add };

/* ===========================================================
    Fetch All Software Licenses
=========================================================== */

const fetchAll = async (req, res) => {

    try {

        const result = await getPaginatedData({
            model: model.SoftwareLicenseManagement,
            query: req.query,
            include: [

                {
                    model: model.SoftwareCategoryMaster,
                    as: "softwareCategory",
                    attributes: [
                        "id",
                        "categoryName"
                    ]
                },

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

                "licenseCode",

                "softwareName",

                "licenseType",

                "remarks"

            ],

            allowedSortFields: [

                "id",

                "licenseCode",

                "softwareName",

                "licenseType",

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
    Fetch Single Software License
=========================================================== */

const fetchSingle = async (req, res) => {

    try {

        const license = await model.SoftwareLicenseManagement.findByPk(req.params.id,
            {
                include: [
                    {
                        model: model.SoftwareCategoryMaster,
                        as: "softwareCategory",
                        attributes: [
                            "id",
                            "categoryName"
                        ]
                    },

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

        if (!license || license.isDeleted) {

            return ReE(res, MESSAGE.NOT_FOUND, 404);

        }

        return ReS(res, {

            message: MESSAGE.FETCHED,

            data: license

        });

    }

    catch (error) {

        return ReE(res, error.message);

    }

};

export { fetchSingle };

/* ===========================================================
    Update Software License
=========================================================== */

const update = async (req, res) => {

    try {

        const license = await model.SoftwareLicenseManagement.findByPk(req.params.id);

        if (!license || license.isDeleted) {

            return ReE(res, MESSAGE.NOT_FOUND, 404);

        }

        const { error } =
            validation.updateSoftwareLicense.validate(req.body);

        if (error) {

            return ReE(res, error.details[0].message, 422);

        }

        const {

            softwareName,
            softwareCategoryId,
            vendorId,
            licenseType,
            numberOfUsers,
            purchaseDate,
            expiryDate,
            renewalDate,
            renewalCost,
            assignedUsers,
            remarks

        } = req.body;

        await license.update({

            softwareName,

            softwareCategoryId,

            vendorId,

            licenseType,

            numberOfUsers,

            purchaseDate,

            expiryDate,

            renewalDate,

            renewalCost,

            assignedUsers,

            remarks

        });

        return ReS(res, {

            message: MESSAGE.UPDATED,

            data: license

        });

    }

    catch (error) {

        return ReE(res, error.message);

    }

};

export { update };


/* ===========================================================
    Remove Software License (Soft Delete)
=========================================================== */

const remove = async (req, res) => {

    try {

        const license = await model.SoftwareLicenseManagement.findByPk(req.params.id);

        if (!license || license.isDeleted) {

            return ReE(res, MESSAGE.NOT_FOUND, 404);

        }

        await license.update({

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
    Change Software License Status
=========================================================== */

const changeStatus = async (req, res) => {

    try {

        const license = await model.SoftwareLicenseManagement.findByPk(req.params.id);

        if (!license || license.isDeleted) {

            return ReE(res, MESSAGE.NOT_FOUND, 404);

        }

        await license.update({

            isActive: !license.isActive

        });

        return ReS(res, {

            message: "Software License Status Updated Successfully",

            data: license

        });

    }

    catch (error) {

        return ReE(res, error.message);

    }

};

export { changeStatus };