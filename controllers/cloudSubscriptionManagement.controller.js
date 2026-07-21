import model from "../models/index.js";
import validation from "../validation/cloudSubscriptionManagement.validation.js";

import { ReE, ReS } from "../services/util.service.js";
import { getPaginatedData } from "../services/common/pagination.service.js";

import MESSAGE from "../constants/messages.js";

/* ===========================================================
    Add Cloud Subscription
=========================================================== */

const add = async (req, res) => {

    try {

        const { error } =
            validation.addCloudSubscription.validate(req.body);

        if (error) {

            return ReE(res, error.details[0].message, 422);

        }

        const {

            serviceName,
            subscriptionType,
            renewalDate,
            monthlyYearlyCost,
            accountOwner,
            remarks

        } = req.body;

        /* ==========================================
            Generate Subscription Code
        ========================================== */

        const lastRecord =
            await model.CloudSubscriptionManagement.findOne({

                order: [["id", "DESC"]]

            });

        let subscriptionCode = "SUB000001";

        if (lastRecord) {

            subscriptionCode =
                "SUB" +
                String(lastRecord.id + 1).padStart(6, "0");

        }

        /* ==========================================
            Create Cloud Subscription
        ========================================== */

        const subscription =
            await model.CloudSubscriptionManagement.create({

                subscriptionCode,

                serviceName,

                subscriptionType,

                renewalDate,

                monthlyYearlyCost,

                accountOwner,

                remarks

            });

        return ReS(res, {

            message: MESSAGE.CREATED,

            data: subscription

        }, 201);

    }

    catch (error) {

        return ReE(res, error.message);

    }

};

export { add };

/* ===========================================================
    Fetch All Cloud Subscriptions
=========================================================== */

const fetchAll = async (req, res) => {

    try {

        const result = await getPaginatedData({

            model: model.CloudSubscriptionManagement,

            query: req.query,

            searchFields: [

                "subscriptionCode",

                "serviceName",

                "subscriptionType",

                "accountOwner",

                "remarks"

            ],

            allowedSortFields: [

                "id",

                "subscriptionCode",

                "serviceName",

                "subscriptionType",

                "renewalDate",

                "monthlyYearlyCost",

                "accountOwner",

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
    Fetch Single Cloud Subscription
=========================================================== */

const fetchSingle = async (req, res) => {

    try {

        const subscription =
            await model.CloudSubscriptionManagement.findByPk(req.params.id);

        if (!subscription || subscription.isDeleted) {

            return ReE(res, MESSAGE.NOT_FOUND, 404);

        }

        return ReS(res, {

            message: MESSAGE.FETCHED,

            data: subscription

        });

    }

    catch (error) {

        return ReE(res, error.message);

    }

};

export { fetchSingle };

/* ===========================================================
    Update Cloud Subscription
=========================================================== */

const update = async (req, res) => {

    try {

        const subscription =
            await model.CloudSubscriptionManagement.findByPk(req.params.id);

        if (!subscription || subscription.isDeleted) {

            return ReE(res, MESSAGE.NOT_FOUND, 404);

        }

        const { error } =
            validation.updateCloudSubscription.validate(req.body);

        if (error) {

            return ReE(res, error.details[0].message, 422);

        }

        const {

            serviceName,
            subscriptionType,
            renewalDate,
            monthlyYearlyCost,
            accountOwner,
            remarks

        } = req.body;

        await subscription.update({

            serviceName,

            subscriptionType,

            renewalDate,

            monthlyYearlyCost,

            accountOwner,

            remarks

        });

        return ReS(res, {

            message: MESSAGE.UPDATED,

            data: subscription

        });

    }

    catch (error) {

        return ReE(res, error.message);

    }

};

export { update };


/* ===========================================================
    Remove Cloud Subscription
=========================================================== */

const remove = async (req, res) => {

    try {

        const subscription =
            await model.CloudSubscriptionManagement.findByPk(req.params.id);

        if (!subscription || subscription.isDeleted) {

            return ReE(res, MESSAGE.NOT_FOUND, 404);

        }

        await subscription.update({

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
    Change Cloud Subscription Status
=========================================================== */

const changeStatus = async (req, res) => {

    try {

        const subscription =
            await model.CloudSubscriptionManagement.findByPk(req.params.id);

        if (!subscription || subscription.isDeleted) {

            return ReE(res, MESSAGE.NOT_FOUND, 404);

        }

        await subscription.update({

            isActive: !subscription.isActive

        });

        return ReS(res, {

            message: "Cloud Subscription Status Updated Successfully",

            data: subscription

        });

    }

    catch (error) {

        return ReE(res, error.message);

    }

};

export { changeStatus };