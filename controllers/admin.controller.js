import model from "../models/index.js";
import { ReE, ReS } from "../services/util.service.js";
import validation from "../validation/admin.validation.js";
import MESSAGE from "../constants/messages.js";
import { getPaginatedData } from "../services/common/pagination.service.js";
import bcrypt from "bcryptjs";
import JwtService from "../services/jwt.service.js";
import { Op } from "sequelize";

const add = async (req, res) => {
    try {
        const { error } = validation.addAdmin.validate(req.body);
        if (error) return ReE(res, error.details[0].message, 422);

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

        const employeeExists = await model.Admin.findOne({
            where: { employeeCode, isDeleted: false }
        });
        if (employeeExists) return ReE(res, "Employee Code already exists.", 409);

        const emailExists = await model.Admin.findOne({
            where: { email, isDeleted: false }
        });
        if (emailExists) return ReE(res, "Email already exists.", 409);

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

        return ReS(res, { message: MESSAGE.CREATED, data: admin }, 201);
    } catch (error) {
        return ReE(res, error.message);
    }
};

export { add }

const fetchAll = async (req, res) => {
    try {
        const result = await getPaginatedData({
            model: model.Admin,
            query: req.query,
            include: [
                { model: model.UserRole, as: "userRole", attributes: ["id", "name"] },
                { model: model.UserType, as: "userType", attributes: ["id", "name"] },
                { model: model.Department, as: "department", attributes: ["id", "name"] },
                { model: model.AdminStatus, as: "status", attributes: ["id", "name"] }
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

        return ReS(res, { message: MESSAGE.FETCHED, ...result });
    } catch (error) {
        return ReE(res, error.message);
    }
};

const fetchSingle = async (req, res) => {
    try {
        const admin = await model.Admin.findByPk(req.params.id, {
            include: [
                { model: model.UserRole, as: "userRole" },
                { model: model.UserType, as: "userType" },
                { model: model.Department, as: "department" },
                { model: model.AdminStatus, as: "status" }
            ]
        });

        if (!admin || admin.isDeleted) {
            return ReE(res, MESSAGE.NOT_FOUND, 404);
        }

        return ReS(res, { data: admin });
    } catch (error) {
        return ReE(res, error.message);
    }
};

const update = async (req, res) => {
    try {
        const admin = await model.Admin.findByPk(req.params.id);
        if (!admin || admin.isDeleted) {
            return ReE(res, MESSAGE.NOT_FOUND, 404);
        }

        const { error } = validation.updateAdmin.validate(req.body);
        if (error) return ReE(res, error.details[0].message, 422);

        // Check unique email if updating
        if (req.body.email && req.body.email !== admin.email) {
            const emailExists = await model.Admin.findOne({
                where: { email: req.body.email, isDeleted: false, id: { [Op.ne]: admin.id } }
            });
            if (emailExists) return ReE(res, "Email already exists.", 409);
        }

        // Check unique employee code if updating
        if (req.body.employeeCode && req.body.employeeCode !== admin.employeeCode) {
            const codeExists = await model.Admin.findOne({
                where: { employeeCode: req.body.employeeCode, isDeleted: false, id: { [Op.ne]: admin.id } }
            });
            if (codeExists) return ReE(res, "Employee Code already exists.", 409);
        }

        if (req.body.password) {
            req.body.password = await bcrypt.hash(req.body.password, 10);
        }

        await admin.update(req.body);
        await admin.reload();

        return ReS(res, { message: MESSAGE.UPDATED, data: admin });
    } catch (error) {
        return ReE(res, error.message);
    }
};

const remove = async (req, res) => {
    try {
        const admin = await model.Admin.findByPk(req.params.id);
        if (!admin || admin.isDeleted) {
            return ReE(res, MESSAGE.NOT_FOUND, 404);
        }

        await admin.update({ isDeleted: true, isActive: false });
        return ReS(res, { message: MESSAGE.DELETED });
    } catch (error) {
        return ReE(res, error.message);
    }
};

const changeStatus = async (req, res) => {
    try {
        const admin = await model.Admin.findByPk(req.params.id);
        if (!admin || admin.isDeleted) {
            return ReE(res, MESSAGE.NOT_FOUND, 404);
        }

        await admin.update({ isActive: !admin.isActive });
        return ReS(res, { message: "Status Updated Successfully", data: admin });
    } catch (error) {
        return ReE(res, error.message);
    }
};

const login = async (req, res) => {

    try {

        const { email, password } = req.body;

        if (!email || !password) {

            return ReE(
                res,
                "Email and Password are required.",
                422
            );

        }

        const admin = await model.Admin.findOne({

            where: {
                email,
                isDeleted: false
            }

        });

        if (!admin) {

            return ReE(
                res,
                "Invalid Email or Password.",
                401
            );

        }

        const passwordMatched = await bcrypt.compare(
            password,
            admin.password
        );

        if (!passwordMatched) {

            return ReE(
                res,
                "Invalid Email or Password.",
                401
            );

        }

        if (!admin.isActive) {

            return ReE(
                res,
                "Account is inactive.",
                403
            );

        }

        const accessToken =
            JwtService.generateAccessToken(admin);

        const refreshToken =
            JwtService.generateRefreshToken(admin);

        await admin.update({

            refreshToken,
            lastLogin: new Date()

        });

        res.cookie("refreshToken", refreshToken, {

            httpOnly: true,

            secure:
                process.env.NODE_ENV === "production",

            sameSite: "Strict",

            maxAge:
                7 * 24 * 60 * 60 * 1000

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

        return ReE(
            res,
            error.message
        );

    }

};

const refreshToken = async (req, res) => {
    try {
        // Request Body YA Cookies — dono me se token pick karega
        const token = req.cookies?.refreshToken || req.body?.refreshToken;

        if (!token) return ReE(res, "Refresh Token Required.", 401);

        let payload;
        try {
            payload = JwtService.verifyRefreshToken(token);
        } catch (err) {
            return ReE(res, "Invalid Refresh Token.", 401);
        }

        const admin = await model.Admin.findOne({
            where: { id: payload.id, isDeleted: false, refreshToken: token }
        });

        if (!admin) return ReE(res, "Invalid Refresh Token.", 401);

        const accessToken = JwtService.generateAccessToken(admin);
        return ReS(res, {
            message: "Token Refreshed Successfully",
            data: { accessToken }
        });
    } catch (error) {
        return ReE(res, error.message);
    }
};

const logout = async (req, res) => {
    try {
        const admin = await model.Admin.findByPk(req.user.id);
        if (!admin) return ReE(res, "Admin not found.", 404);

        await admin.update({ refreshToken: null });
        return ReS(res, { message: "Logout Successful" });
    } catch (error) {
        return ReE(res, error.message);
    }
};

const me = async (req, res) => {
    try {
        const admin = await model.Admin.findOne({
            where: { id: req.user.id, isDeleted: false },
            attributes: { exclude: ["password", "refreshToken"] },
            include: [
                { model: model.UserRole, as: "userRole", attributes: ["id", "name"] },
                { model: model.UserType, as: "userType", attributes: ["id", "name"] },
                { model: model.AdminStatus, as: "status", attributes: ["id", "name"] },
                { model: model.Department, as: "department", attributes: ["id", "name"] },
            ]
        });

        if (!admin) return ReE(res, "Admin not found.", 404);

        return ReS(res, { message: "Logged In User", data: admin });
    } catch (error) {
        return ReE(res, error.message);
    }
};


// ========================================================= Side baar =======================================================

const getSidebar = async (req, res) => {

    try {

        // Logged-in admin ID middleware se aayegi
        const adminId = req.user.id;

        console.log("SIDEBAR ADMIN ID:", adminId);

        // 1. Admin find karo
        const admin = await model.Admin.findOne({

            where: {
                id: adminId,
                isActive: true,
                isDeleted: false
            },

            attributes: [
                "id",
                "userRoleId"
            ]

        });

        console.log("ADMIN FOUND:", !!admin);

        if (!admin) {

            return ReE(
                res,
                "Admin not found.",
                404
            );

        }

        console.log(
            "ADMIN ROLE ID:",
            admin.userRoleId
        );


        // 2. Role ke according menus + permissions fetch karo
        const rolePermissions =
            await model.RolePermission.findAll({

                where: {

                    roleId: admin.userRoleId,

                    isActive: true,

                    isDeleted: false

                },

                include: [

                    {
                        model: model.Menu,

                        as: "menu",

                        where: {

                            isActive: true,

                            isDeleted: false

                        },

                        attributes: [

                            "id",
                            "parentId",
                            "name",
                            "route",
                            "icon",
                            "level",
                            "sortOrder"

                        ]

                    },

                    {
                        model: model.Permission,

                        as: "permission",

                        where: {

                            isActive: true,

                            isDeleted: false

                        },

                        attributes: [

                            "id",
                            "name",
                            "description"

                        ]

                    }

                ],

                order: [

                    [
                        {
                            model: model.Menu,
                            as: "menu"
                        },
                        "sortOrder",
                        "ASC"
                    ]

                ]

            });


        console.log(
            "ROLE PERMISSION COUNT:",
            rolePermissions.length
        );


        // 3. Agar permission nahi hai
        if (!rolePermissions.length) {

            return ReS(
                res,
                {
                    message: "No sidebar menu found.",
                    data: []
                }
            );

        }


        // 4. Menu ko frontend-friendly format me convert karo

        const menus = rolePermissions.map(
            (item) => {

                return {

                    id: item.menu.id,

                    parentId: item.menu.parentId,

                    label: item.menu.name,

                    route: item.menu.route,

                    icon: item.menu.icon,

                    level: item.menu.level,

                    sortOrder: item.menu.sortOrder,

                    permission: {

                        id: item.permission.id,

                        name: item.permission.name,

                        description:
                            item.permission.description

                    },

                    children: []

                };

            }
        );


        // 5. Parent / Child hierarchy create karo

        const menuMap = new Map();

        menus.forEach((menu) => {

            menuMap.set(
                menu.id,
                menu
            );

        });


        const finalMenu = [];


        menus.forEach((menu) => {

            // Parent menu
            if (!menu.parentId) {

                finalMenu.push(menu);

                return;

            }


            // Child menu
            const parent =
                menuMap.get(menu.parentId);


            if (parent) {

                parent.children.push(menu);

            }

        });


        // 6. Parent menu ko sort karo
        finalMenu.sort(
            (a, b) =>
                a.sortOrder - b.sortOrder
        );


        // 7. Children ko sort karo
        finalMenu.forEach(
            (parent) => {

                parent.children.sort(
                    (a, b) =>
                        a.sortOrder -
                        b.sortOrder
                );

            }
        );


        console.log(
            "FINAL SIDEBAR:",
            JSON.stringify(
                finalMenu,
                null,
                2
            )
        );


        return ReS(
            res,
            {
                message:
                    "Sidebar menu fetched successfully.",

                data: finalMenu
            }
        );


    } catch (error) {

        console.error(
            "GET SIDEBAR ERROR:",
            error
        );

        return ReE(
            res,
            error.message
        );

    }

};

export { fetchAll }
export { fetchSingle }
export { update }
export { remove }
export { changeStatus }
export { login }
export { refreshToken }
export { logout }
export { me }
export { getSidebar }