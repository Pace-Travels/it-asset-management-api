import model from "../models/index.js";
import validation from "../validation/internetManagement.validation.js";

import { ReE, ReS } from "../services/util.service.js";
import { getPaginatedData } from "../services/common/pagination.service.js";

import MESSAGE from "../constants/messages.js";

/* ===========================================================
    Add Internet Connection
=========================================================== */

const add = async (req, res) => {

    try {

        const { error } =
            validation.addInternet.validate(req.body);

        if (error) {

            return ReE(res, error.details[0].message, 422);

        }

        const {

            ispName,
            connectionType,
            planName,
            bandwidth,
            contractStartDate,
            contractEndDate,
            renewalDate,
            monthlyCharges,
            remarks

        } = req.body;

        /* ==========================================
            Generate Internet Code
        ========================================== */

        const lastRecord =
            await model.InternetManagement.findOne({

                order: [["id", "DESC"]]

            });

        let internetCode = "INT000001";

        if (lastRecord) {

            internetCode =
                "INT" +
                String(lastRecord.id + 1).padStart(6, "0");

        }

        /* ==========================================
            Create Internet Connection
        ========================================== */

        const internet =
            await model.InternetManagement.create({

                internetCode,

                ispName,

                connectionType,

                planName,

                bandwidth,

                contractStartDate,

                contractEndDate,

                renewalDate,

                monthlyCharges,

                remarks

            });

        return ReS(res, {

            message: MESSAGE.CREATED,

            data: internet

        }, 201);

    }

    catch (error) {

        return ReE(res, error.message);

    }

};

export { add };

/* ===========================================================
    Fetch All Internet Connections
=========================================================== */

const fetchAll = async (req, res) => {

    try {

        const result = await getPaginatedData({

            model: model.InternetManagement,

            query: req.query,

            searchFields: [

                "internetCode",

                "ispName",

                "connectionType",

                "planName",

                "bandwidth",

                "remarks"

            ],

            allowedSortFields: [

                "id",

                "internetCode",

                "ispName",

                "connectionType",

                "planName",

                "bandwidth",

                "contractStartDate",

                "contractEndDate",

                "renewalDate",

                "monthlyCharges",

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
    Fetch Single Internet Connection
=========================================================== */

const fetchSingle = async (req, res) => {

    try {

        const internet =
            await model.InternetManagement.findByPk(req.params.id);

        if (!internet || internet.isDeleted) {

            return ReE(res, MESSAGE.NOT_FOUND, 404);

        }

        return ReS(res, {

            message: MESSAGE.FETCHED,

            data: internet

        });

    }

    catch (error) {

        return ReE(res, error.message);

    }

};

export { fetchSingle };

/* ===========================================================
    Update Internet Connection
=========================================================== */

const update = async (req, res) => {

    try {

        const internet =
            await model.InternetManagement.findByPk(req.params.id);

        if (!internet || internet.isDeleted) {

            return ReE(res, MESSAGE.NOT_FOUND, 404);

        }

        const { error } =
            validation.updateInternet.validate(req.body);

        if (error) {

            return ReE(res, error.details[0].message, 422);

        }

        const {

            ispName,
            connectionType,
            planName,
            bandwidth,
            contractStartDate,
            contractEndDate,
            renewalDate,
            monthlyCharges,
            remarks

        } = req.body;

        await internet.update({

            ispName,

            connectionType,

            planName,

            bandwidth,

            contractStartDate,

            contractEndDate,

            renewalDate,

            monthlyCharges,

            remarks

        });

        return ReS(res, {

            message: MESSAGE.UPDATED,

            data: internet

        });

    }

    catch (error) {

        return ReE(res, error.message);

    }

};

export { update };


/* ===========================================================
    Remove Internet Connection
=========================================================== */

const remove = async (req, res) => {

    try {

        const internet =
            await model.InternetManagement.findByPk(req.params.id);

        if (!internet || internet.isDeleted) {

            return ReE(res, MESSAGE.NOT_FOUND, 404);

        }

        await internet.update({

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
    Change Internet Connection Status
=========================================================== */

const changeStatus = async (req, res) => {

    try {

        const internet =
            await model.InternetManagement.findByPk(req.params.id);

        if (!internet || internet.isDeleted) {

            return ReE(res, MESSAGE.NOT_FOUND, 404);

        }

        await internet.update({

            isActive: !internet.isActive

        });

        return ReS(res, {

            message: "Internet Connection Status Updated Successfully",

            data: internet

        });

    }

    catch (error) {

        return ReE(res, error.message);

    }

};

export { changeStatus };