import model from "../models/index.js";
import validation from "../validation/monitoringMaintenance.validation.js";

import { ReE, ReS } from "../services/util.service.js";
import { getPaginatedData } from "../services/common/pagination.service.js";

import MESSAGE from "../constants/messages.js";

/* ===========================================================
    Add Monitoring & Maintenance
=========================================================== */

const add = async (req, res) => {

    try {

        const { error } =
            validation.addMonitoringMaintenance.validate(req.body);
        if (error) {
            return ReE(res, error.details[0].message, 422);
        }

        const {

            serverId,
            maintenanceSchedule,
            maintenanceHistory,
            backupSchedule,
            backupStatusId,
            uptimePercentage,
            serverHealthStatusId,
            remarks

        } = req.body;

        /* ==========================================
            Generate Maintenance Code
        ========================================== */

        const lastRecord =
            await model.MonitoringMaintenance.findOne({
                order: [["id", "DESC"]]
            });
        let maintenanceCode = "MNT000001";

        if (lastRecord) {
            maintenanceCode =
                "MNT" +
                String(lastRecord.id + 1).padStart(6, "0");
        }

        /* ==========================================
            Create Record
        ========================================== */

        const monitoring =
            await model.MonitoringMaintenance.create({
                maintenanceCode,
                serverId,
                maintenanceSchedule,
                maintenanceHistory,
                backupSchedule,
                backupStatusId,
                uptimePercentage,
                serverHealthStatusId,
                remarks
            });

        return ReS(res, {
            message: MESSAGE.CREATED,
            data: monitoring
        }, 201);
    }

    catch (error) {
        return ReE(res, error.message);
    }

};

export { add };

/* ===========================================================
    Fetch All Monitoring & Maintenance
=========================================================== */

const fetchAll = async (req, res) => {

    try {

        const result = await getPaginatedData({
            model: model.MonitoringMaintenance,
            query: req.query,
            include: [
                {
                    model: model.BackupStatusMaster,
                    as: "backupStatus",
                    attributes: [
                        "id",
                        "backupStatusName"
                    ]
                },
                {
                    model: model.BackupStatusMaster,
                    as: "serverHealthStatus",
                    attributes: [
                        "id",
                        "serverHealthStatusName"
                    ]
                }
            ],
            searchFields: [
                "maintenanceCode",
                "maintenanceHistory",
                "remarks"
            ],

            allowedSortFields: [

                "id",
                "maintenanceCode",
                "maintenanceSchedule",
                "backupSchedule",
                "uptimePercentage",
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
    Fetch Single Monitoring & Maintenance
=========================================================== */

const fetchSingle = async (req, res) => {

    try {
        const monitoring = await model.MonitoringMaintenance.findByPk(req.params.id,
            {
                include: [
                    {
                        model: model.BackupStatusMaster,
                        as: "backupStatus",
                        attributes: [
                            "id",
                            "backupStatusName"
                        ]
                    },
                    {
                        model: model.ServerHealthStatusMaster,
                        as: "serverHealthStatus",
                        attributes: [
                            "id",
                            "healthStatusName"
                        ]
                    }
                ]
            }
        );
        if (!monitoring || monitoring.isDeleted) {
            return ReE(res, MESSAGE.NOT_FOUND, 404);
        }

        return ReS(res, {
            message: MESSAGE.FETCHED,
            data: monitoring
        });
    }

    catch (error) {
        return ReE(res, error.message);
    }

};

export { fetchSingle };

/* ===========================================================
    Update Monitoring & Maintenance
=========================================================== */

const update = async (req, res) => {

    try {

        const monitoring = await model.MonitoringMaintenance.findByPk(req.params.id);
        if (!monitoring || monitoring.isDeleted) {
            return ReE(res, MESSAGE.NOT_FOUND, 404);
        }

        const { error } =
            validation.updateMonitoringMaintenance.validate(req.body);
        if (error) {
            return ReE(res, error.details[0].message, 422);
        }

        const {

            serverId,
            maintenanceSchedule,
            maintenanceHistory,
            backupSchedule,
            backupStatusId,
            uptimePercentage,
            serverHealthStatusId,
            remarks

        } = req.body;
        await monitoring.update({

            serverId,
            maintenanceSchedule,
            maintenanceHistory,
            backupSchedule,
            backupStatusId,
            uptimePercentage,
            serverHealthStatusId,
            remarks
        });

        return ReS(res, {
            message: MESSAGE.UPDATED,
            data: monitoring
        });
    }

    catch (error) {
        return ReE(res, error.message);
    }
};

export { update };


/* ===========================================================
    Remove Monitoring & Maintenance
=========================================================== */

const remove = async (req, res) => {

    try {

        const monitoring = await model.MonitoringMaintenance.findByPk(req.params.id);
        if (!monitoring || monitoring.isDeleted) {
            return ReE(res, MESSAGE.NOT_FOUND, 404);
        }

        await monitoring.update({
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
    Change Monitoring Status
=========================================================== */

const changeStatus = async (req, res) => {

    try {

        const monitoring = await model.MonitoringMaintenance.findByPk(req.params.id);
        if (!monitoring || monitoring.isDeleted) {
            return ReE(res, MESSAGE.NOT_FOUND, 404);
        }

        await monitoring.update({
            isActive: !monitoring.isActive
        });

        return ReS(res, {
            message: "Monitoring Status Updated Successfully",
            data: monitoring
        });
    }

    catch (error) {
        return ReE(res, error.message);
    }
};

export { changeStatus };