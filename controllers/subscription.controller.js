import model from "../models/index.js";
import validation from "../validation/subscription.validator.js";

import { ReE, ReS } from "../services/util.service.js";
import { getPaginatedData } from "../services/common/pagination.service.js";

import MESSAGE from "../constants/messages.js";

/* ===========================================================
    Add Subscription
=========================================================== */

const add = async (req, res) => {

    try {

        const { error } =
            validation.addSubscription.validate(req.body);

        if (error) {

            return ReE(res, error.details[0].message, 422);

        }

        const {

            vendorId,

            description,

            amount,

            paymentMethodId,

            reminderTypeId,

            reminderSentTo,

            expectedPaymentDate,

            paymentInitiatedById,

            expiryDate,

            paymentDate

        } = req.body;

        /* ==========================================
            Generate Subscription Code
        ========================================== */

        const lastSubscription =
            await model.Subscription.findOne({

                order: [["id", "DESC"]]

            });

        let subscriptionCode = "SUB000001";

        if (lastSubscription) {

            subscriptionCode =
                "SUB" +
                String(lastSubscription.id + 1).padStart(6, "0");

        }

        /* ==========================================
            Create Subscription
        ========================================== */

        const subscription =
            await model.Subscription.create({

                subscriptionCode,

                vendorId,

                description,

                amount,

                paymentMethodId,

                reminderTypeId,

                reminderSentTo,

                expectedPaymentDate,

                paymentInitiatedById,

                expiryDate,

                paymentDate

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
    Fetch All Subscription
=========================================================== */

const fetchAll = async (req, res) => {

    try {

        const result = await getPaginatedData({

            model: model.Subscription,

            query: req.query,

            include: [

                {

                    model: model.VendorManagement,

                    as: "vendor",

                    attributes: [

                        "id",

                        "vendorName"

                    ]

                },

                {

                    model: model.SubscriptionPaymentMethod,

                    as: "paymentMethod",

                    attributes: [

                        "id",

                        "paymentMethodName"

                    ]

                },

                {

                    model: model.SubscriptionReminderType,

                    as: "reminderType",

                    attributes: [

                        "id",

                        "reminderTypeName"

                    ]

                },

                {

                    model: model.EmployeeDetails,

                    as: "paymentInitiatedBy",

                    attributes: [

                        "id",

                        "employeeCode",

                        "employeeName"

                    ]

                }

            ],

            searchFields: [

                "subscriptionCode",

                "description",

                "reminderSentTo"

            ],

            allowedSortFields: [

                "id",

                "subscriptionCode",

                "amount",

                "expectedPaymentDate",

                "paymentDate",

                "expiryDate",

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
    Fetch Single Subscription
=========================================================== */

const fetchSingle = async (req, res) => {

    try {

        const subscription = await model.Subscription.findByPk(
            req.params.id,
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
                        model: model.SubscriptionPaymentMethod,
                        as: "paymentMethod",
                        attributes: [
                            "id",
                            "paymentMethodName"
                        ]
                    },

                    {
                        model: model.SubscriptionReminderType,
                        as: "reminderType",
                        attributes: [
                            "id",
                            "reminderTypeName"
                        ]
                    },

                    {
                        model: model.EmployeeDetails,
                        as: "paymentInitiatedBy",
                        attributes: [
                            "id",
                            "employeeCode",
                            "employeeName"
                        ]
                    }
                ]
            }
        );

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
    Update Subscription
=========================================================== */

const update = async (req, res) => {

    try {

        const subscription = await model.Subscription.findByPk(req.params.id);

        if (!subscription || subscription.isDeleted) {

            return ReE(res, MESSAGE.NOT_FOUND, 404);

        }

        const { error } =
            validation.updateSubscription.validate(req.body);

        if (error) {

            return ReE(res, error.details[0].message, 422);

        }

        const {

            vendorId,

            description,

            amount,

            paymentMethodId,

            reminderTypeId,

            reminderSentTo,

            expectedPaymentDate,

            paymentInitiatedById,

            expiryDate,

            paymentDate

        } = req.body;

        await subscription.update({

            vendorId,

            description,

            amount,

            paymentMethodId,

            reminderTypeId,

            reminderSentTo,

            expectedPaymentDate,

            paymentInitiatedById,

            expiryDate,

            paymentDate

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
    Remove Subscription (Soft Delete)
=========================================================== */

const remove = async (req, res) => {

    try {

        const subscription =
            await model.Subscription.findByPk(req.params.id);

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
    Change Subscription Status
=========================================================== */

const changeStatus = async (req, res) => {

    try {

        const subscription =
            await model.Subscription.findByPk(req.params.id);

        if (!subscription || subscription.isDeleted) {

            return ReE(res, MESSAGE.NOT_FOUND, 404);

        }

        await subscription.update({

            isActive: !subscription.isActive

        });

        return ReS(res, {

            message: "Subscription Status Updated Successfully",

            data: subscription

        });

    }

    catch (error) {

        return ReE(res, error.message);

    }

};

export { changeStatus };