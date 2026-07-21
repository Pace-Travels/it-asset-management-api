import express from "express";

import * as DomainWebsiteManagementController from "../../controllers/domainWebsiteManagement.controller.js";

const router = express.Router();

/* ===========================================================
    Domain & Website Management
=========================================================== */

router.post(
    "/",
    DomainWebsiteManagementController.add
);

router.get(
    "/",
    DomainWebsiteManagementController.fetchAll
);

router.get(
    "/:id",
    DomainWebsiteManagementController.fetchSingle
);

router.put(
    "/:id",
    DomainWebsiteManagementController.update
);

router.delete(
    "/:id",
    DomainWebsiteManagementController.remove
);

router.patch(
    "/:id",
    DomainWebsiteManagementController.changeStatus
);

export default router;