import express from "express";

import * as InternetManagementController from "../../controllers/internetManagement.controller.js";

const router = express.Router();

/* ===========================================================
    Internet Management
=========================================================== */

router.post(
    "/",
    InternetManagementController.add
);

router.get(
    "/",
    InternetManagementController.fetchAll
);

router.get(
    "/:id",
    InternetManagementController.fetchSingle
);

router.put(
    "/:id",
    InternetManagementController.update
);

router.delete(
    "/:id",
    InternetManagementController.remove
);

router.patch(
    "/:id",
    InternetManagementController.changeStatus
);

export default router;