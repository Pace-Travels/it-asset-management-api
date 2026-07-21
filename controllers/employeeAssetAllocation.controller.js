import model from "../models/index.js";
import validation from "../validation/employeeAssetAllocation.validation.js";

import { ReE, ReS } from "../services/util.service.js";
import { getPaginatedData } from "../services/common/pagination.service.js";

import MESSAGE from "../constants/messages.js";

/* ===========================================================
    Add Employee Asset Allocation
=========================================================== */

const add = async (req, res) => {

    try {

        const { error } =
            validation.addEmployeeAssetAllocation.validate(req.body);

        if (error) {

            return ReE(res, error.details[0].message, 422);

        }

        const {

            employeeId,
            assetId,
            allocatedDate,
            returnDate,
            allocationStatus,
            remarks

        } = req.body;

        /* ==========================================
            Generate Allocation Code
        ========================================== */

        const lastRecord =
            await model.EmployeeAssetAllocation.findOne({

                order: [["id", "DESC"]]

            });

        let allocationCode = "ALL000001";

        if (lastRecord) {

            allocationCode =
                "ALL" +
                String(lastRecord.id + 1).padStart(6, "0");

        }

        /* ==========================================
            Create Allocation
        ========================================== */

        const allocation =
            await model.EmployeeAssetAllocation.create({

                allocationCode,

                employeeId,

                assetId,

                allocatedDate,

                returnDate,

                allocationStatus,

                remarks

            });

        return ReS(res, {

            message: MESSAGE.CREATED,

            data: allocation

        }, 201);

    }

    catch (error) {

        return ReE(res, error.message);

    }

};

export { add };

/* ===========================================================
    Fetch All Employee Asset Allocations
=========================================================== */

const fetchAll = async (req, res) => {

    try {

        const result = await getPaginatedData({

            model: model.EmployeeAssetAllocation,

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

                },

                {

                    model: model.AssetInformation,

                    as: "asset",

                    attributes: [

                        "id",

                        "assetCode",

                        "assetName"

                    ]

                }

            ],

            searchFields: [

                "allocationCode",

                "allocationStatus",

                "remarks"

            ],

            allowedSortFields: [

                "id",

                "allocationCode",

                "employeeId",

                "assetId",

                "allocatedDate",

                "returnDate",

                "allocationStatus",

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
    Fetch Single Employee Asset Allocation
=========================================================== */

const fetchSingle = async (req, res) => {

    try {

        const allocation =
            await model.EmployeeAssetAllocation.findByPk(req.params.id,
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

                        },

                        {

                            model: model.AssetInformation,

                            as: "asset",

                            attributes: [

                                "id",

                                "assetCode",

                                "assetName"

                            ]

                        }

                    ]

                }
            );

        if (!allocation || allocation.isDeleted) {

            return ReE(res, MESSAGE.NOT_FOUND, 404);

        }

        return ReS(res, {

            message: MESSAGE.FETCHED,

            data: allocation

        });

    }

    catch (error) {

        return ReE(res, error.message);

    }

};

export { fetchSingle };

/* ===========================================================
    Update Employee Asset Allocation
=========================================================== */

const update = async (req, res) => {

    try {

        const allocation =
            await model.EmployeeAssetAllocation.findByPk(req.params.id);

        if (!allocation || allocation.isDeleted) {

            return ReE(res, MESSAGE.NOT_FOUND, 404);

        }

        const { error } =
            validation.updateEmployeeAssetAllocation.validate(req.body);

        if (error) {

            return ReE(res, error.details[0].message, 422);

        }

        const {

            employeeId,
            assetId,
            allocatedDate,
            returnDate,
            allocationStatus,
            remarks

        } = req.body;

        await allocation.update({

            employeeId,

            assetId,

            allocatedDate,

            returnDate,

            allocationStatus,

            remarks

        });

        return ReS(res, {

            message: MESSAGE.UPDATED,

            data: allocation

        });

    }

    catch (error) {

        return ReE(res, error.message);

    }

};

export { update };


/* ===========================================================
    Remove Employee Asset Allocation
=========================================================== */

const remove = async (req, res) => {

    try {

        const allocation =
            await model.EmployeeAssetAllocation.findByPk(req.params.id);

        if (!allocation || allocation.isDeleted) {

            return ReE(res, MESSAGE.NOT_FOUND, 404);

        }

        await allocation.update({

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
    Change Employee Asset Allocation Status
=========================================================== */

const changeStatus = async (req, res) => {

    try {

        const allocation =
            await model.EmployeeAssetAllocation.findByPk(req.params.id);

        if (!allocation || allocation.isDeleted) {

            return ReE(res, MESSAGE.NOT_FOUND, 404);

        }

        await allocation.update({

            isActive: !allocation.isActive

        });

        return ReS(res, {

            message: "Employee Asset Allocation Status Updated Successfully",

            data: allocation

        });

    }

    catch (error) {

        return ReE(res, error.message);

    }

};

export { changeStatus };