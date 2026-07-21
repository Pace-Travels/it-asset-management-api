import express from "express";

import * as SoftwareLicenseManagementController from "../../controllers/softwareLicenseManagement.controller.js";

const router = express.Router();

/* ===========================================================
    Software License Management
=========================================================== */

router.post(
    "/",
    SoftwareLicenseManagementController.add
);

router.get(
    "/",
    SoftwareLicenseManagementController.fetchAll
);

router.get(
    "/:id",
    SoftwareLicenseManagementController.fetchSingle
);

router.put(
    "/:id",
    SoftwareLicenseManagementController.update
);

router.delete(
    "/:id",
    SoftwareLicenseManagementController.remove
);

router.patch(
    "/:id",
    SoftwareLicenseManagementController.changeStatus
);

export default router;