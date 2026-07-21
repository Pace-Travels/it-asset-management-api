import express from "express";

import * as EmailAccountManagementController from "../../controllers/emailAccountManagement.controller.js";

const router = express.Router();

/* ===========================================================
    Email Account Management
=========================================================== */

router.post(
    "/",
    EmailAccountManagementController.add
);

router.get(
    "/",
    EmailAccountManagementController.fetchAll
);

router.get(
    "/:id",
    EmailAccountManagementController.fetchSingle
);

router.put(
    "/:id",
    EmailAccountManagementController.update
);

router.delete(
    "/:id",
    EmailAccountManagementController.remove
);

router.patch(
    "/:id",
    EmailAccountManagementController.changeStatus
);

export default router;