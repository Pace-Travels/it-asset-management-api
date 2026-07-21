import MasterService from "../services/master.service.js";
import MasterRegistry from "../config/masterRegistry.js";
import db from "../models/index.js";

class MasterController {

    /**
     * Get Model from Registry
     */
    getModel(moduleName) {
        const modelName = MasterRegistry[moduleName];
        if (!modelName) {
            throw new Error(`Module '${moduleName}' not registered`);
        }
        const model = db[modelName];
        if (!model) {
            throw new Error(`Model '${modelName}' not found`);
        }
        return model;
    }

    /**
     * Get All
     */
    getAll = async (req, res, next) => {
        try {
            const model = this.getModel(req.masterModel);
            const result = await MasterService.getAll(model, req.query);
            return res.status(200).json({
                success: true,
                message: "Data fetched successfully",
                data: result.rows,
                pagination: result.pagination
            });

        } catch (error) {
            next(error);
        }

    };

    /**
     * Get By Id
     */
    getById = async (req, res, next) => {
        try {
            const model = this.getModel(req.masterModel);
            const result = await MasterService.getById(
                model,
                req.params.id
            );
            if (!result) {
                return res.status(404).json({
                    success: false,
                    message: "Record not found"
                });
            }

            return res.status(200).json({
                success: true,
                message: "Data fetched successfully",
                data: result
            });

        } catch (error) {
            next(error);
        }

    };

    /**
     * Create
     */
    create = async (req, res, next) => {
        try {
            const model = this.getModel(req.masterModel);
            const result = await MasterService.create(
                model,
                req.body
            );
            return res.status(201).json({
                success: true,
                message: "Record created successfully",
                data: result
            });

        } catch (error) {
            next(error);
        }

    };

    /**
     * Update
     */
    update = async (req, res, next) => {
        try {
            const model = this.getModel(req.masterModel);
            const result = await MasterService.update(
                model,
                req.params.id,
                req.body
            );

            if (!result) {
                return res.status(404).json({
                    success: false,
                    message: "Record not found"
                });
            }

            return res.status(200).json({
                success: true,
                message: "Record updated successfully",
                data: result
            });

        } catch (error) {
            next(error);
        }

    };

    /**
     * Delete
     */
    delete = async (req, res, next) => {

        try {
            const model = this.getModel(req.masterModel);
            const result = await MasterService.delete(
                model,
                req.params.id
            );

            if (!result) {
                return res.status(404).json({
                    success: false,
                    message: "Record not found"
                });
            }

            return res.status(200).json({
                success: true,
                message: "Record deleted successfully"
            });

        } catch (error) {
            next(error);
        }

    };

    /**
     * Active / Inactive
     */
    changeStatus = async (req, res, next) => {

        try {
            const model = this.getModel(req.masterModel);
            const result = await MasterService.changeStatus(
                model,
                req.params.id,
                req.body.isActive
            );

            if (!result) {
                return res.status(404).json({
                    success: false,
                    message: "Record not found"
                });
            }

            return res.status(200).json({
                success: true,
                message: "Status updated successfully",
                data: result
            });

        } catch (error) {
            next(error);
        }

    };

}

export default new MasterController();