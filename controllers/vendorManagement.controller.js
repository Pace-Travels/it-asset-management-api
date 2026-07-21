import { Op } from "sequelize";
import model from "../models/index.js";
import validation from "../validation/vendorManagement.validation.js";
import { ReE, ReS } from "../services/util.service.js";
import MESSAGE from "../constants/messages.js";
import { getPaginatedData } from "../services/common/pagination.service.js";

/* ===========================================================
   Add Vendor
=========================================================== */

const add = async (req, res) => {

    try {
        // const { error } = validation.addVendor.validate(req.body);
        // if (error) {
        //     return ReE(res, error.details[0].message, 422);
        // }
        const {
            vendorName,
            contactPerson,
            mobileNumber,
            email,
            gstNumber,
            panNumber,
            website,
            address,
            city,
            state,
            country,
            postalCode,
            remarks
        } = req.body;
        /* ==========================================
           Generate Vendor Code
        ========================================== */
        const lastVendor = await model.VendorManagement.findOne({
            order: [["id", "DESC"]]
        });

        let vendorCode = "VEND000001";
        if (lastVendor) {
            vendorCode =
                "VEND" +
                String(lastVendor.id + 1).padStart(6, "0");
        }

        /* ==========================================
           Email Duplicate
        ========================================== */
        if (email) {
            const emailExists =
                await model.VendorManagement.findOne({
                    where: {
                        email,
                        isDeleted: false
                    }

                });

            if (emailExists) {
                return ReE(res, "Email already exists.", 409);
            }

        }

        /* ==========================================
           GST Duplicate
        ========================================== */

        if (gstNumber) {
            const gstExists =
                await model.VendorManagement.findOne({
                    where: {
                        gstNumber,
                        isDeleted: false
                    }
                });

            if (gstExists) {
                return ReE(res, "GST Number already exists.", 409);
            }

        }

        /* ==========================================
           PAN Duplicate
        ========================================== */

        if (panNumber) {
            const panExists =
                await model.VendorManagement.findOne({
                    where: {
                        panNumber,
                        isDeleted: false
                    }
                });
            if (panExists) {
                return ReE(res, "PAN Number already exists.", 409);
            }
        }

        /* ==========================================
           Create Vendor
        ========================================== */

        const vendor =
            await model.VendorManagement.create({
                vendorCode,
                vendorName,
                contactPerson,
                mobileNumber,
                email,
                gstNumber,
                panNumber,
                website,
                address,
                city,
                state,
                country,
                postalCode,
                remarks
            });

        return ReS(res, {
            message: MESSAGE.CREATED,
            data: vendor
        }, 201);
    }

    catch (error) {
        // return ReE(res, error.message);
        console.log(error);

        return res.status(500).json({
            success: false,
            error: error.message,
            details: error.errors?.map(err => err.message)
        });
    }
};

export { add };

/* ===========================================================
   Fetch All Vendors
=========================================================== */
const fetchAll = async (req, res) => {

    try {
        const result = await getPaginatedData({
            model: model.VendorManagement,
            query: req.query,
            searchFields: [
                "vendorCode",
                "vendorName",
                "contactPerson",
                "mobileNumber",
                "email"
            ],

            allowedSortFields: [
                "id",
                "vendorCode",
                "vendorName",
                "contactPerson",
                "mobileNumber",
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
    Fetch Single Vendor
=========================================================== */

const fetchSingle = async (req, res) => {

    try {

        const vendor = await model.VendorManagement.findByPk(req.params.id,
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
                    }
                ]
            }
        );

        if (!vendor || vendor.isDeleted) {
            return ReE(res, MESSAGE.NOT_FOUND, 404);
        }

        return ReS(res, {

            message: MESSAGE.FETCHED,

            data: vendor

        });

    }

    catch (error) {

        return ReE(res, error.message);

    }

};

export { fetchSingle };


/* ===========================================================
    Update Vendor
=========================================================== */

const update = async (req, res) => {

    try {
        const vendor = await model.VendorManagement.findByPk(req.params.id);
        if (!vendor || vendor.isDeleted) {
            return ReE(res, MESSAGE.NOT_FOUND, 404);
        }

        const { error } = validation.updateVendor.validate(req.body);
        if (error) {
            return ReE(res, error.details[0].message, 422);
        }

        const {
            vendorName,
            contactPerson,
            mobileNumber,
            email,
            gstNumber,
            panNumber,
            website,
            address,
            city,
            state,
            country,
            postalCode,
            remarks
        } = req.body;

        if (email) {
            const emailExists = await model.VendorManagement.findOne({
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

        }

        if (gstNumber) {
            const gstExists = await model.VendorManagement.findOne({
                where: {
                    gstNumber,
                    id: {
                        [Op.ne]: req.params.id
                    },
                    isDeleted: false
                }
            });

            if (gstExists) {
                return ReE(res, "GST Number already exists.", 409);
            }

        }

        if (panNumber) {

            const panExists = await model.VendorManagement.findOne({
                where: {
                    panNumber,
                    id: {
                        [Op.ne]: req.params.id
                    },
                    isDeleted: false
                }

            });

            if (panExists) {
                return ReE(res, "PAN Number already exists.", 409);
            }

        }

        await vendor.update({
            vendorName,
            contactPerson,
            mobileNumber,
            email,
            gstNumber,
            panNumber,
            website,
            address,
            city,
            state,
            country,
            postalCode,
            remarks
        });

        return ReS(res, {
            message: MESSAGE.UPDATED,
            data: vendor
        });

    }

    catch (error) {
        return ReE(res, error.message);
    }
};

export { update };

/* ===========================================================
    Remove Vendor (Soft Delete)
=========================================================== */

const remove = async (req, res) => {

    try {
        const vendor = await model.VendorManagement.findByPk(req.params.id);
        if (!vendor || vendor.isDeleted) {
            return ReE(res, MESSAGE.NOT_FOUND, 404);
        }
        await vendor.update({
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
    Change Vendor Status
=========================================================== */

const changeStatus = async (req, res) => {

    try {
        const vendor = await model.VendorManagement.findByPk(req.params.id);
        if (!vendor || vendor.isDeleted) {
            return ReE(res, MESSAGE.NOT_FOUND, 404);
        }

        await vendor.update({
            isActive: !vendor.isActive
        });

        return ReS(res, {
            message: "Vendor Status Updated Successfully",
            data: vendor
        });
    }

    catch (error) {
        return ReE(res, error.message);
    }

};

export { changeStatus };