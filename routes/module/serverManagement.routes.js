import express from "express";

import * as ServerManagementController from "../../controllers/serverManagement.controller.js";

const router = express.Router();

/* ===========================================================
    Server Management
=========================================================== */

router.post("/", ServerManagementController.add );

router.get("/", ServerManagementController.fetchAll );

router.get("/:id", ServerManagementController.fetchSingle );

router.put("/:id", ServerManagementController.update );

router.delete("/:id", ServerManagementController.remove );

router.patch("/c:id", ServerManagementController.changeStatus );

export default router;