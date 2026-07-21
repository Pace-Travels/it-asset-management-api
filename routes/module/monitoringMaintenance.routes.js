import express from "express";

import * as MonitoringMaintenanceController from "../../controllers/monitoringMaintenance.controller.js";

const router = express.Router();

/* ===========================================================
    Monitoring & Maintenance
=========================================================== */

router.post(
    "/",
    MonitoringMaintenanceController.add
);

router.get(
    "/",
    MonitoringMaintenanceController.fetchAll
);

router.get(
    "/:id",
    MonitoringMaintenanceController.fetchSingle
);

router.put(
    "/:id",
    MonitoringMaintenanceController.update
);

router.delete(
    "/:id",
    MonitoringMaintenanceController.remove
);

router.patch(
    "/:id",
    MonitoringMaintenanceController.changeStatus
);

export default router;