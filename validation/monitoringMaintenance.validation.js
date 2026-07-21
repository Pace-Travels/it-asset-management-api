import Joi from "joi";

const addMonitoringMaintenance = Joi.object({

    serverId: Joi.number()
        .required(),

    maintenanceSchedule: Joi.date()
        .required(),

    maintenanceHistory: Joi.string()
        .trim()
        .allow("", null),

    backupSchedule: Joi.date()
        .required(),

    backupStatusId: Joi.number()
        .required(),

    uptimePercentage: Joi.number()
        .min(0)
        .max(100)
        .allow(null),

    serverHealthStatusId: Joi.number()
        .required(),

    remarks: Joi.string()
        .trim()
        .max(500)
        .allow("", null)

});

const updateMonitoringMaintenance = Joi.object({

    serverId: Joi.number(),

    maintenanceSchedule: Joi.date(),

    maintenanceHistory: Joi.string()
        .trim()
        .allow("", null),

    backupSchedule: Joi.date(),

    backupStatusId: Joi.number(),

    uptimePercentage: Joi.number()
        .min(0)
        .max(100)
        .allow(null),

    serverHealthStatusId: Joi.number(),

    remarks: Joi.string()
        .trim()
        .max(500)
        .allow("", null),

    isActive: Joi.boolean()

});

export default {

    addMonitoringMaintenance,

    updateMonitoringMaintenance

};