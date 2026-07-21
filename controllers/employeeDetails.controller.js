import { Op } from "sequelize";
import model from "../models/index.js";

import validation from "../validation/employeeDetails.validation.js";

import { ReE, ReS } from "../services/util.service.js";
import { getPaginatedData } from "../services/common/pagination.service.js";

import MESSAGE from "../constants/messages.js";

/* ===========================================================
    Add Employee
=========================================================== */

const add = async (req, res) => {

    try {

        const { error } = validation.addEmployee.validate(req.body);

        if (error) {

            return ReE(res, error.details[0].message, 422);

        }

        const {

            employeeId,
            employeeName,
            departmentId,
            designation,
            email,
            mobileNumber

        } = req.body;

        /* ==========================================
            Generate Employee Code
        ========================================== */

        const lastEmployee =
            await model.EmployeeDetails.findOne({

                order: [["id", "DESC"]]

            });

        let employeeCode = "EMP000001";

        if (lastEmployee) {

            employeeCode =
                "EMP" +
                String(lastEmployee.id + 1).padStart(6, "0");

        }

        /* ==========================================
            Employee ID Duplicate
        ========================================== */

        const employeeIdExists =
            await model.EmployeeDetails.findOne({

                where: {

                    employeeId,

                    isDeleted: false

                }

            });

        if (employeeIdExists) {

            return ReE(res, "Employee ID already exists.", 409);

        }

        /* ==========================================
            Email Duplicate
        ========================================== */

        const emailExists =
            await model.EmployeeDetails.findOne({

                where: {

                    email,

                    isDeleted: false

                }

            });

        if (emailExists) {

            return ReE(res, "Email already exists.", 409);

        }

        /* ==========================================
            Create Employee
        ========================================== */

        const employee =
            await model.EmployeeDetails.create({

                employeeCode,

                employeeId,

                employeeName,

                departmentId,

                designation,

                email,

                mobileNumber

            });

        return ReS(res, {

            message: MESSAGE.CREATED,

            data: employee

        }, 201);

    }

    catch (error) {

        return ReE(res, error.message);

    }

};

export { add };


/* ===========================================================
    Fetch All Employees
=========================================================== */

const fetchAll = async (req, res) => {

    try {
        const result = await getPaginatedData({
            model: model.EmployeeDetails,
            query: req.query,
            include: [
                {
                    model: model.DepartmentMaster,
                    as: "department",
                    attributes: [
                        "id",
                        "departmentName"
                    ]
                }
            ],
            searchFields: [
                "employeeCode",
                "employeeId",
                "employeeName",
                "designation",
                "email",
                "mobileNumber"
            ],

            allowedSortFields: [
                "id",
                "employeeCode",
                "employeeId",
                "employeeName",
                "designation",
                "email",
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
    Fetch Single Employee
=========================================================== */

const fetchSingle = async (req, res) => {
    try {
        const employee = await model.EmployeeDetails.findByPk(
            req.params.id,
            {
                include: [
                    {
                        model: model.DepartmentMaster,
                        as: "department",
                        attributes: [
                            "id",
                            "departmentName"
                        ]
                    }
                ]
            }
        );

        if (!employee || employee.isDeleted) {
            return ReE(res, MESSAGE.NOT_FOUND, 404);
        }

        return ReS(res, {
            message: MESSAGE.FETCHED,
            data: employee
        });
    }

    catch (error) {
        return ReE(res, error.message);
    }

};

export { fetchSingle };

/* ===========================================================
    Update Employee
=========================================================== */

const update = async (req, res) => {

    try {

        const employee = await model.EmployeeDetails.findByPk(req.params.id);
        if (!employee || employee.isDeleted) {
            return ReE(res, MESSAGE.NOT_FOUND, 404);
        }

        const { error } = validation.updateEmployee.validate(req.body);
        if (error) {
            return ReE(res, error.details[0].message, 422);
        }

        const {

            employeeId,
            employeeName,
            departmentId,
            designation,
            email,
            mobileNumber

        } = req.body;

        /* ==========================================
            Employee ID Duplicate
        ========================================== */

        const employeeIdExists =
            await model.EmployeeDetails.findOne({
                where: {
                    employeeId,
                    id: {
                        [Op.ne]: req.params.id
                    },
                    isDeleted: false
                }
            });

        if (employeeIdExists) {
            return ReE(res, "Employee ID already exists.", 409);
        }

        /* ==========================================
            Email Duplicate
        ========================================== */

        const emailExists =
            await model.EmployeeDetails.findOne({
                where: {
                    email,
                    id: {
                        [Op.ne]: req.params.id
                    },
                    isDeleted: false
                }
            });

        if (emailExists) {
            return ReE(res, "Email already exists.", 409);
        }

        await employee.update({
            employeeId,
            employeeName,
            departmentId,
            designation,
            email,
            mobileNumber
        });

        return ReS(res, {
            message: MESSAGE.UPDATED,
            data: employee
        });
    }

    catch (error) {
        return ReE(res, error.message);
    }
};

export { update };


/* ===========================================================
    Remove Employee (Soft Delete)
=========================================================== */

const remove = async (req, res) => {

    try {

        const employee = await model.EmployeeDetails.findByPk(req.params.id);
        if (!employee || employee.isDeleted) {
            return ReE(res, MESSAGE.NOT_FOUND, 404);
        }

        await employee.update({
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
    Change Employee Status
=========================================================== */

const changeStatus = async (req, res) => {

    try {

        const employee = await model.EmployeeDetails.findByPk(req.params.id);
        if (!employee || employee.isDeleted) {
            return ReE(res, MESSAGE.NOT_FOUND, 404);
        }

        await employee.update({
            isActive: !employee.isActive
        });

        return ReS(res, {
            message: "Employee Status Updated Successfully",
            data: employee
        });
    }

    catch (error) {
        return ReE(res, error.message);
    }
};

export { changeStatus };