import model from "../models/index.js";
import validation from "../validation/sslCertificateManagement.validation.js";

import { ReE, ReS } from "../services/util.service.js";
import { getPaginatedData } from "../services/common/pagination.service.js";

import MESSAGE from "../constants/messages.js";

/* ===========================================================
    Add SSL Certificate
=========================================================== */

const add = async (req, res) => {

    try {

        const { error } =
            validation.addSSLCertificate.validate(req.body);

        if (error) {

            return ReE(res, error.details[0].message, 422);

        }

        const {

            domainId,
            certificateProvider,
            certificateType,
            purchaseDate,
            expiryDate,
            renewalDate,
            renewalCost,
            statusId,
            remarks

        } = req.body;

        /* ==========================================
            Generate SSL Code
        ========================================== */

        const lastRecord =
            await model.SSLCertificateManagement.findOne({

                order: [["id", "DESC"]]

            });

        let sslCode = "SSL000001";

        if (lastRecord) {

            sslCode =
                "SSL" +
                String(lastRecord.id + 1).padStart(6, "0");

        }

        /* ==========================================
            Create SSL Certificate
        ========================================== */

        const sslCertificate =
            await model.SSLCertificateManagement.create({

                sslCode,

                domainId,

                certificateProvider,

                certificateType,

                purchaseDate,

                expiryDate,

                renewalDate,

                renewalCost,

                statusId,

                remarks

            });

        return ReS(res, {

            message: MESSAGE.CREATED,

            data: sslCertificate

        }, 201);

    }

    catch (error) {

        return ReE(res, error.message);

    }

};

export { add };


/* ===========================================================
    Fetch All SSL Certificates
=========================================================== */

const fetchAll = async (req, res) => {

    try {

        const result = await getPaginatedData({

            model: model.SSLCertificateManagement,

            query: req.query,
            include: [

                {

                    model: model.DomainWebsiteManagement,

                    as: "domain",

                    attributes: [

                        "id",

                        "domainName"

                    ]

                }

            ],

            searchFields: [

                "sslCode",

                "certificateProvider",

                "certificateType",

                "remarks"

            ],

            allowedSortFields: [

                "id",

                "sslCode",

                "certificateProvider",

                "certificateType",

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
    Fetch Single SSL Certificate
=========================================================== */

const fetchSingle = async (req, res) => {

    try {

        const sslCertificate =
            await model.SSLCertificateManagement.findByPk(req.params.id,

                {

                    include: [

                        {

                            model: model.DomainWebsiteManagement,

                            as: "domain",

                            attributes: [

                                "id",

                                "domainName"

                            ]

                        }

                    ]

                }

            );

        if (!sslCertificate || sslCertificate.isDeleted) {

            return ReE(res, MESSAGE.NOT_FOUND, 404);

        }

        return ReS(res, {

            message: MESSAGE.FETCHED,

            data: sslCertificate

        });

    }

    catch (error) {

        return ReE(res, error.message);

    }

};

export { fetchSingle };

/* ===========================================================
    Update SSL Certificate
=========================================================== */

const update = async (req, res) => {

    try {

        const sslCertificate = await model.SSLCertificateManagement.findByPk(req.params.id);

        if (!sslCertificate || sslCertificate.isDeleted) {

            return ReE(res, MESSAGE.NOT_FOUND, 404);

        }

        const { error } =
            validation.updateSSLCertificate.validate(req.body);

        if (error) {

            return ReE(res, error.details[0].message, 422);

        }

        const {

            domainId,
            certificateProvider,
            certificateType,
            purchaseDate,
            expiryDate,
            renewalDate,
            renewalCost,
            statusId,
            remarks

        } = req.body;

        await sslCertificate.update({

            domainId,

            certificateProvider,

            certificateType,

            purchaseDate,

            expiryDate,

            renewalDate,

            renewalCost,

            statusId,

            remarks

        });

        return ReS(res, {

            message: MESSAGE.UPDATED,

            data: sslCertificate

        });

    }

    catch (error) {

        return ReE(res, error.message);

    }

};

export { update };


/* ===========================================================
    Remove SSL Certificate
=========================================================== */

const remove = async (req, res) => {

    try {

        const sslCertificate = await model.SSLCertificateManagement.findByPk(req.params.id);

        if (!sslCertificate || sslCertificate.isDeleted) {

            return ReE(res, MESSAGE.NOT_FOUND, 404);

        }

        await sslCertificate.update({

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
    Change SSL Certificate Status
=========================================================== */

const changeStatus = async (req, res) => {

    try {

        const sslCertificate = await model.SSLCertificateManagement.findByPk(req.params.id);

        if (!sslCertificate || sslCertificate.isDeleted) {

            return ReE(res, MESSAGE.NOT_FOUND, 404);

        }

        await sslCertificate.update({

            isActive: !sslCertificate.isActive

        });

        return ReS(res, {

            message: "SSL Certificate Status Updated Successfully",

            data: sslCertificate

        });

    }

    catch (error) {

        return ReE(res, error.message);

    }

};

export { changeStatus };