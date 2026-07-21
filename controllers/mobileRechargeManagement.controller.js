import model from "../models/index.js";
import validation from "../validation/mobileRechargeManagement.validation.js";

import { ReE, ReS } from "../services/util.service.js";
import { getPaginatedData } from "../services/common/pagination.service.js";

import MESSAGE from "../constants/messages.js";

/* ===========================================================
    Add Mobile Recharge
=========================================================== */

const add = async (req, res) => {

    try {

        const { error } =
            validation.addMobileRecharge.validate(req.body);

        if (error) {

            return ReE(res, error.details[0].message, 422);

        }

        const {

            mobileNumber,
            assignedEmployee,
            serviceProvider,
            rechargeAmount,
            rechargeDate,
            validityPeriod,
            nextRechargeDate,
            statusId,
            remarks

        } = req.body;

        /* ==========================================
            Generate Mobile Recharge Code
        ========================================== */

        const lastRecord =
            await model.MobileRechargeManagement.findOne({

                order: [["id", "DESC"]]

            });

        let mobileRechargeCode = "MOB000001";

        if (lastRecord) {

            mobileRechargeCode =
                "MOB" +
                String(lastRecord.id + 1).padStart(6, "0");

        }

        /* ==========================================
            Create Mobile Recharge
        ========================================== */

        const mobileRecharge =
            await model.MobileRechargeManagement.create({

                mobileRechargeCode,

                mobileNumber,

                assignedEmployee,

                serviceProvider,

                rechargeAmount,

                rechargeDate,

                validityPeriod,

                nextRechargeDate,

                statusId,

                remarks

            });

        return ReS(res, {

            message: MESSAGE.CREATED,

            data: mobileRecharge

        }, 201);

    }

    catch (error) {

        return ReE(res, error.message);

    }

};

export { add };

/* ===========================================================
    Fetch All Mobile Recharges
=========================================================== */

const fetchAll = async (req, res) => {

    try {

        const result = await getPaginatedData({

            model: model.MobileRechargeManagement,

            query: req.query,

            searchFields: [

                "mobileRechargeCode",

                "mobileNumber",

                "assignedEmployee",

                "serviceProvider",

                "validityPeriod",

                "remarks"

            ],

            allowedSortFields: [

                "id",

                "mobileRechargeCode",

                "mobileNumber",

                "assignedEmployee",

                "serviceProvider",

                "rechargeAmount",

                "rechargeDate",

                "nextRechargeDate",

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
    Fetch Single Mobile Recharge
=========================================================== */

const fetchSingle = async (req, res) => {

    try {

        const mobileRecharge =
            await model.MobileRechargeManagement.findByPk(req.params.id);

        if (!mobileRecharge || mobileRecharge.isDeleted) {

            return ReE(res, MESSAGE.NOT_FOUND, 404);

        }

        return ReS(res, {

            message: MESSAGE.FETCHED,

            data: mobileRecharge

        });

    }

    catch (error) {

        return ReE(res, error.message);

    }

};

export { fetchSingle };

/* ===========================================================
    Update Mobile Recharge
=========================================================== */

const update = async (req, res) => {

    try {

        const mobileRecharge =
            await model.MobileRechargeManagement.findByPk(req.params.id);

        if (!mobileRecharge || mobileRecharge.isDeleted) {

            return ReE(res, MESSAGE.NOT_FOUND, 404);

        }

        const { error } =
            validation.updateMobileRecharge.validate(req.body);

        if (error) {

            return ReE(res, error.details[0].message, 422);

        }

        const {

            mobileNumber,
            assignedEmployee,
            serviceProvider,
            rechargeAmount,
            rechargeDate,
            validityPeriod,
            nextRechargeDate,
            statusId,
            remarks

        } = req.body;

        await mobileRecharge.update({

            mobileNumber,

            assignedEmployee,

            serviceProvider,

            rechargeAmount,

            rechargeDate,

            validityPeriod,

            nextRechargeDate,

            statusId,

            remarks

        });

        return ReS(res, {

            message: MESSAGE.UPDATED,

            data: mobileRecharge

        });

    }

    catch (error) {

        return ReE(res, error.message);

    }

};

export { update };


/* ===========================================================
    Remove Mobile Recharge
=========================================================== */

const remove = async (req, res) => {

    try {

        const mobileRecharge =
            await model.MobileRechargeManagement.findByPk(req.params.id);

        if (!mobileRecharge || mobileRecharge.isDeleted) {

            return ReE(res, MESSAGE.NOT_FOUND, 404);

        }

        await mobileRecharge.update({

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
    Change Mobile Recharge Status
=========================================================== */

const changeStatus = async (req, res) => {

    try {

        const mobileRecharge =
            await model.MobileRechargeManagement.findByPk(req.params.id);

        if (!mobileRecharge || mobileRecharge.isDeleted) {

            return ReE(res, MESSAGE.NOT_FOUND, 404);

        }

        await mobileRecharge.update({

            isActive: !mobileRecharge.isActive

        });

        return ReS(res, {

            message: "Mobile Recharge Status Updated Successfully",

            data: mobileRecharge

        });

    }

    catch (error) {

        return ReE(res, error.message);

    }

};

export { changeStatus };