import express from "express";

import * as MobileRechargeManagementController from "../../controllers/mobileRechargeManagement.controller.js";

const router = express.Router();

/* ===========================================================
    Mobile Recharge Management
=========================================================== */

router.post(
    "/",
    MobileRechargeManagementController.add
);

router.get(
    "/",
    MobileRechargeManagementController.fetchAll
);

router.get(
    "/:id",
    MobileRechargeManagementController.fetchSingle
);

router.put(
    "/:id",
    MobileRechargeManagementController.update
);

router.delete(
    "/:id",
    MobileRechargeManagementController.remove
);

router.patch(
    "/:id",
    MobileRechargeManagementController.changeStatus
);

export default router;