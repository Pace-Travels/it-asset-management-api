import express from "express";

import * as CloudSubscriptionManagementController from "../../controllers/cloudSubscriptionManagement.controller.js";

const router = express.Router();

/* ===========================================================
    Cloud Subscription Management
=========================================================== */

router.post(
    "/",
    CloudSubscriptionManagementController.add
);

router.get(
    "/",
    CloudSubscriptionManagementController.fetchAll
);

router.get(
    "/:id",
    CloudSubscriptionManagementController.fetchSingle
);

router.put(
    "/:id",
    CloudSubscriptionManagementController.update
);

router.delete(
    "/:id",
    CloudSubscriptionManagementController.remove
);

router.patch(
    "/:id",
    CloudSubscriptionManagementController.changeStatus
);

export default router;