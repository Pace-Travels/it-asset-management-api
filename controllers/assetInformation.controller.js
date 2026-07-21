import model from '../models/index.js';
import { ReE, ReS } from '../services/util.service.js';
import validation from '../validation/assetInformation.validation.js';
import MESSAGE from '../constants/messages.js';
import { getPaginatedData } from "../services/common/pagination.service.js";

const add = async (req, res) => {

    try {
        const { error } = validation.addAssetInformation.validate(req.body);
        if (error) {
            return ReE(res, error.details[0].message, 422);
        }

        const {
            assetCode,
            assetName,
            categoryId,
            brand,
            modelNumber,
            serialNumber,
            purchaseDate,
            purchaseCost,
            vendorId,
            warrantyExpiryDate,
            assignedEmployeeId,
            departmentId,
            statusId,
            remarks
        } = req.body;

        const assetCodeExists = await model.AssetInformation.findOne({
            where: {
                assetCode,
                isDeleted: false
            }
        });

        if (assetCodeExists) {
            return ReE(res, "Asset Code already exists.", 409);
        }

        const serialNumberExists = await model.AssetInformation.findOne({
            where: {
                serialNumber,
                isDeleted: false
            }
        });

        if (serialNumberExists) {
            return ReE(res, "Serial Number already exists.", 409);
        }

        const asset = await model.AssetInformation.create({
            assetCode,
            assetName,
            categoryId,
            brand,
            modelNumber,
            serialNumber,
            purchaseDate,
            purchaseCost,
            vendorId,
            warrantyExpiryDate,
            assignedEmployeeId,
            departmentId,
            statusId,
            remarks
        });

        return ReS(res, {
            message: MESSAGE.CREATED,
            data: asset
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
            model: model.AssetInformation,
            query: req.query,
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
                    model: model.StatusMaster,
                    as: "status",
                    attributes: [
                        "id",
                        "statusName"
                    ]
                }
            ],
            searchFields: [
                "assetCode",
                "assetName",
                "brand",
                "modelNumber",
                "serialNumber"
            ],

            allowedSortFields: [
                "id",
                "assetCode",
                "assetName",
                "serialNumber",
                "purchaseDate",
                "purchaseCost",
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
        const asset = await model.AssetInformation.findByPk(req.params.id,
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

                        model: model.StatusMaster,
                        as: "status",
                        attributes: [
                            "id",
                            "statusName"
                        ]
                    }
                ]
            }
        );
        if (!asset || asset.isDeleted) {
            return ReE(res, MESSAGE.NOT_FOUND, 404);
        }

        return ReS(res, {
            data: asset
        });
    }

    catch (error) {
        return ReE(res, error.message);
    }

};

export { fetchSingle };

const update = async (req, res) => {

    try {
        const asset = await model.AssetInformation.findByPk(req.params.id);
        if (!asset || asset.isDeleted) {
            return ReE(res, MESSAGE.NOT_FOUND, 404);
        }
        const { error } = validation.updateAssetInformation.validate(req.body);
        if (error) {
            return ReE(res, error.details[0].message);
        }
        await asset.update(req.body);
        return ReS(res, {
            message: MESSAGE.UPDATED,
            data: asset
        });
    }

    catch (error) {
        return ReE(res, error.message);
    }

};

export { update };

const remove = async (req, res) => {

    try {
        const asset = await model.AssetInformation.findByPk(req.params.id);
        if (!asset || asset.isDeleted) {
            return ReE(res, MESSAGE.NOT_FOUND, 404);
        }

        await asset.update({
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
        const asset = await model.AssetInformation.findByPk(req.params.id);
        if (!asset || asset.isDeleted) {
            return ReE(res, MESSAGE.NOT_FOUND, 404);
        }

        await asset.update({
            isActive: !asset.isActive
        });

        return ReS(res, {
            message: "Status Updated Successfully",
            data: asset
        });
    }

    catch (error) {
        return ReE(res, error.message);
    }

};

export { changeStatus };