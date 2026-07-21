import model from "../models/index.js";
import validation from "../validation/emailAccountManagement.validation.js";

import { ReE, ReS } from "../services/util.service.js";
import { getPaginatedData } from "../services/common/pagination.service.js";

import MESSAGE from "../constants/messages.js";

/* ===========================================================
    Add Email Account
=========================================================== */

const add = async (req, res) => {

    try {

        const { error } =
            validation.addEmailAccount.validate(req.body);

        if (error) {

            return ReE(res, error.details[0].message, 422);

        }

        const {

            emailAddress,
            employeeId,
            provider,
            renewalDate,
            renewalCost,
            statusId,
            remarks

        } = req.body;

        /* ==========================================
            Generate Email Code
        ========================================== */

        const lastRecord =
            await model.EmailAccountManagement.findOne({

                order: [["id", "DESC"]]

            });

        let emailCode = "EML000001";

        if (lastRecord) {

            emailCode =
                "EML" +
                String(lastRecord.id + 1).padStart(6, "0");

        }

        /* ==========================================
            Duplicate Email Check
        ========================================== */

        const emailExists =
            await model.EmailAccountManagement.findOne({

                where: {

                    emailAddress,

                    isDeleted: false

                }

            });

        if (emailExists) {

            return ReE(res, "Email Address already exists.", 409);

        }

        /* ==========================================
            Create Email Account
        ========================================== */

        const emailAccount =
            await model.EmailAccountManagement.create({

                emailCode,

                emailAddress,

                employeeId,

                provider,

                renewalDate,

                renewalCost,

                statusId,

                remarks

            });

        return ReS(res, {

            message: MESSAGE.CREATED,

            data: emailAccount

        }, 201);

    }

    catch (error) {

        return ReE(res, error.message);

    }

};

export { add };

/* ===========================================================
    Fetch All Email Accounts
=========================================================== */

const fetchAll = async (req, res) => {

    try {

        const result = await getPaginatedData({

            model: model.EmailAccountManagement,

            query: req.query,

            include: [

                {

                    model: model.EmployeeDetails,

                    as: "employee",

                    attributes: [

                        "id",

                        "employeeCode",

                        "employeeName"

                    ]

                }

            ],

            searchFields: [

                "emailCode",

                "emailAddress",

                "provider",

                "remarks"

            ],

            allowedSortFields: [

                "id",

                "emailCode",

                "emailAddress",

                "provider",

                "renewalDate",

                "renewalCost",

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
    Fetch Single Email Account
=========================================================== */

const fetchSingle = async (req, res) => {

    try {

        const emailAccount =
            await model.EmailAccountManagement.findByPk(req.params.id,

                {

                    include: [

                        {

                            model: model.EmployeeDetails,

                            as: "employee",

                            attributes: [

                                "id",

                                "employeeCode",

                                "employeeName"

                            ]

                        }

                    ]

                }
            );

        if (!emailAccount || emailAccount.isDeleted) {

            return ReE(res, MESSAGE.NOT_FOUND, 404);

        }

        return ReS(res, {

            message: MESSAGE.FETCHED,

            data: emailAccount

        });

    }

    catch (error) {

        return ReE(res, error.message);

    }

};

export { fetchSingle };


/* ===========================================================
    Update Email Account
=========================================================== */

const update = async (req, res) => {

    try {

        const emailAccount = await model.EmailAccountManagement.findByPk(req.params.id);

        if (!emailAccount || emailAccount.isDeleted) {

            return ReE(res, MESSAGE.NOT_FOUND, 404);

        }

        const { error } =
            validation.updateEmailAccount.validate(req.body);

        if (error) {

            return ReE(res, error.details[0].message, 422);

        }

        const {

            emailAddress,
            employeeId,
            provider,
            renewalDate,
            renewalCost,
            statusId,
            remarks

        } = req.body;

        const emailExists =
            await model.EmailAccountManagement.findOne({

                where: {

                    emailAddress,

                    isDeleted: false

                }

            });

        if (emailExists && emailExists.id !== emailAccount.id) {

            return ReE(res, "Email Address already exists.", 409);

        }

        await emailAccount.update({

            emailAddress,

            employeeId,

            provider,

            renewalDate,

            renewalCost,

            statusId,

            remarks

        });

        return ReS(res, {

            message: MESSAGE.UPDATED,

            data: emailAccount

        });

    }

    catch (error) {

        return ReE(res, error.message);

    }

};

export { update };


/* ===========================================================
    Remove Email Account
=========================================================== */

const remove = async (req, res) => {

    try {

        const emailAccount = await model.EmailAccountManagement.findByPk(req.params.id);

        if (!emailAccount || emailAccount.isDeleted) {

            return ReE(res, MESSAGE.NOT_FOUND, 404);

        }

        await emailAccount.update({

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
    Change Email Account Status
=========================================================== */

const changeStatus = async (req, res) => {

    try {

        const emailAccount = await model.EmailAccountManagement.findByPk(req.params.id);

        if (!emailAccount || emailAccount.isDeleted) {

            return ReE(res, MESSAGE.NOT_FOUND, 404);

        }

        await emailAccount.update({

            isActive: !emailAccount.isActive

        });

        return ReS(res, {

            message: "Email Account Status Updated Successfully",

            data: emailAccount

        });

    }

    catch (error) {

        return ReE(res, error.message);

    }

};

export { changeStatus };