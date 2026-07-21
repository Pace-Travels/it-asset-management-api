import express from "express";

import * as EmployeeAssetAllocationController from "../../controllers/employeeAssetAllocation.controller.js";

const router = express.Router();

/* ===========================================================
    Employee Asset Allocation
=========================================================== */

router.post(
    "/",
    EmployeeAssetAllocationController.add
);

router.get(
    "/",
    EmployeeAssetAllocationController.fetchAll
);

router.get(
    "/:id",
    EmployeeAssetAllocationController.fetchSingle
);

router.put(
    "/:id",
    EmployeeAssetAllocationController.update
);

router.delete(
    "/:id",
    EmployeeAssetAllocationController.remove
);

router.patch(
    "/:id",
    EmployeeAssetAllocationController.changeStatus
);

export default router;