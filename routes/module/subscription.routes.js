import express from "express";

import * as subscriptionController from "../../controllers/subscription.controller.js";

const router = express.Router();

/* ===========================================================
    Cloud Subscription Management
=========================================================== */

router.post(
    "/",
    subscriptionController.add
);

router.get(
    "/",
    subscriptionController.fetchAll
);

router.get(
    "/:id",
    subscriptionController.fetchSingle
);

router.put(
    "/:id",
    subscriptionController.update
);

router.delete(
    "/:id",
    subscriptionController.remove
);

router.patch(
    "/:id",
    subscriptionController.changeStatus
);

export default router;