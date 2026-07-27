import model from "../models/index.js";
import { ReE, ReS } from "../services/util.service.js";
import validation from "../validation/admin.validation.js";
import MESSAGE from "../constants/messages.js";
import { getPaginatedData } from "../services/common/pagination.service.js";
import bcrypt from "bcryptjs";
import JwtService from "../services/jwt.service.js";

const add = async (req, res) => {

    try {

        const { error } = validation.addAdmin.validate(req.body);

        if (error) {
            return ReE(res, error.details[0].message, 422);
        }

        const {

            employeeCode,
            firstName,
            lastName,
            email,
            mobileNumber,
            password,
            profileImage,
            userRoleId,
            userTypeId,
            departmentId,
            adminStatusId

        } = req.body;

        // Employee Code

        const employeeExists = await model.Admin.findOne({

            where: {
                employeeCode,
                isDeleted: false
            }

        });

        if (employeeExists) {
            return ReE(res, "Employee Code already exists.", 409);
        }

        // Email

        const emailExists = await model.Admin.findOne({

            where: {
                email,
                isDeleted: false
            }

        });

        if (emailExists) {
            return ReE(res, "Email already exists.", 409);
        }

        // Password Hash

        const hashedPassword = await bcrypt.hash(password, 10);

        const admin = await model.Admin.create({

            employeeCode,
            firstName,
            lastName,
            email,
            mobileNumber,
            password: hashedPassword,
            profileImage,
            userRoleId,
            userTypeId,
            departmentId,
            adminStatusId

        });

        return ReS(res, {

            message: MESSAGE.CREATED,

            data: admin

        }, 201);

    }

    catch (error) {

        return ReE(res, error.message);

    }

};

export { add };


const fetchAll = async (req, res) => {

    try {

        const result = await getPaginatedData({

            model: model.Admin,

            query: req.query,

            include: [

                {
                    model: model.UserRole,
                    as: "userRole",
                    attributes: ["id", "name"]
                },

                {
                    model: model.UserType,
                    as: "userType",
                    attributes: ["id", "name"]
                },

                {
                    model: model.Department,
                    as: "department",
                    attributes: ["id", "name"]
                },

                {
                    model: model.AdminStatus,
                    as: "status",
                    attributes: ["id", "name"]
                }

            ],

            searchFields: [

                "employeeCode",
                "firstName",
                "lastName",
                "email",
                "mobileNumber"

            ],

            allowedSortFields: [

                "id",
                "employeeCode",
                "firstName",
                "lastName",
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


const fetchSingle = async (req, res) => {

    try {

        const admin = await model.Admin.findByPk(req.params.id, {

            include: [

                {
                    model: model.UserRole,
                    as: "userRole"
                },

                {
                    model: model.UserType,
                    as: "userType"
                },

                {
                    model: model.Department,
                    as: "department"
                },

                {
                    model: model.AdminStatus,
                    as: "status"
                }

            ]

        });

        if (!admin || admin.isDeleted) {

            return ReE(res, MESSAGE.NOT_FOUND, 404);

        }

        return ReS(res, {

            data: admin

        });

    }

    catch (error) {

        return ReE(res, error.message);

    }

};

export { fetchSingle };


const update = async (req, res) => {

    try {

        const admin = await model.Admin.findByPk(req.params.id);

        if (!admin || admin.isDeleted) {

            return ReE(res, MESSAGE.NOT_FOUND, 404);

        }

        const { error } = validation.updateAdmin.validate(req.body);

        if (error) {

            return ReE(res, error.details[0].message);

        }

        if (req.body.password) {

            req.body.password = await bcrypt.hash(req.body.password, 10);

        }

        await admin.update(req.body);

        return ReS(res, {

            message: MESSAGE.UPDATED,

            data: admin

        });

    }

    catch (error) {

        return ReE(res, error.message);

    }

};

export { update };


const remove = async (req, res) => {

    try {

        const admin = await model.Admin.findByPk(req.params.id);

        if (!admin || admin.isDeleted) {

            return ReE(res, MESSAGE.NOT_FOUND, 404);

        }

        await admin.update({

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


const changeStatus = async (req, res) => {

    try {

        const admin = await model.Admin.findByPk(req.params.id);

        if (!admin || admin.isDeleted) {

            return ReE(res, MESSAGE.NOT_FOUND, 404);

        }

        await admin.update({

            isActive: !admin.isActive

        });

        return ReS(res, {

            message: "Status Updated Successfully",

            data: admin

        });

    }

    catch (error) {

        return ReE(res, error.message);

    }

};

export { changeStatus };



// ==================================Login==================================

const login = async (req, res) => {

    try {

        const { email, password } = req.body;

        if (!email || !password) {

            return ReE(res, "Email and Password are required.", 422);

        }

        const admin = await model.Admin.findOne({

            where: {

                email,

                isDeleted: false

            }

        });

        if (!admin) {

            return ReE(res, "Invalid Email or Password.", 401);

        }

        if (!admin.isActive) {

            return ReE(res, "Account is inactive.", 403);

        }

        const passwordMatched = await bcrypt.compare(

            password,

            admin.password

        );

        if (!passwordMatched) {

            return ReE(res, "Invalid Email or Password.", 401);

        }

        // Generate Tokens

        const accessToken = JwtService.generateAccessToken(admin);

        const refreshToken = JwtService.generateRefreshToken(admin);

        // Save Refresh Token

        await admin.update({

            refreshToken,

            lastLogin: new Date()

        });

        return ReS(res, {

            message: "Login Successful",

            data: {

                accessToken,

                refreshToken,

                expiresIn: "15m",

                user: {

                    id: admin.id,

                    employeeCode: admin.employeeCode,

                    firstName: admin.firstName,

                    lastName: admin.lastName,

                    email: admin.email,

                    userRoleId: admin.userRoleId,

                    userTypeId: admin.userTypeId,

                    departmentId: admin.departmentId,

                    adminStatusId: admin.adminStatusId

                }

            }

        });

    }

    catch (error) {

        return ReE(res, error.message);

    }

};

export { login };



const refreshToken = async (req, res) => {

    try {

        const { refreshToken } = req.body;

        if (!refreshToken) {

            return ReE(res, "Refresh Token Required.", 401);

        }

        let payload;

        try {

            payload = JwtService.verifyRefreshToken(refreshToken);

        }

        catch {

            return ReE(res, "Invalid Refresh Token.", 401);

        }

        const admin = await model.Admin.findOne({

            where: {

                id: payload.id,

                isDeleted: false,

                refreshToken

            }

        });

        if (!admin) {

            return ReE(res, "Invalid Refresh Token.", 401);

        }

        const accessToken = JwtService.generateAccessToken(admin);

        return ReS(res, {

            message: "Token Refreshed Successfully",

            data: {

                accessToken

            }

        });

    }

    catch (error) {

        return ReE(res, error.message);

    }

};

export { refreshToken };


const logout = async (req, res) => {

    try {

        const admin = await model.Admin.findByPk(req.user.id);

        if (!admin) {

            return ReE(res, "Admin not found.", 404);

        }

        await admin.update({

            refreshToken: null

        });

        return ReS(res, {

            message: "Logout Successful"

        });

    }

    catch (error) {

        return ReE(res, error.message);

    }

};

export { logout };


const me = async (req, res) => {

    try {

        const admin = await model.Admin.findOne({

            where: {

                id: req.user.id,

                isDeleted: false

            },

            attributes: {

                exclude: [

                    "password",

                    "refreshToken"

                ]

            },

            include: [

                {

                    model: model.UserRole,

                    as: "userRole",

                    attributes: [

                        "id",

                        "name"

                    ]

                },

                {

                    model: model.UserType,

                    as: "userType",

                    attributes: [

                        "id",

                        "name"

                    ]

                },

                {

                    model: model.AdminStatus,

                    as: "adminStatus",

                    attributes: [

                        "id",

                        "name"

                    ]

                }

            ]

        });

        if (!admin) {

            return ReE(res, "Admin not found.", 404);

        }

        return ReS(res, {

            message: "Logged In User",

            data: admin

        });

    }

    catch (error) {

        return ReE(res, error.message);

    }

};

export { me };