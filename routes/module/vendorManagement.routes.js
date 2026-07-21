import express from "express";
import * as VendorManagementController from "../../controllers/vendorManagement.controller.js";

const router = express.Router();

/* ===========================================================
    Vendor Management
=========================================================== */

router.post("/",VendorManagementController.add );

router.get("/", VendorManagementController.fetchAll );

router.get("/:id", VendorManagementController.fetchSingle );

router.put("/:id", VendorManagementController.update );

router.delete("/:id", VendorManagementController.remove );

router.patch("/:id", VendorManagementController.changeStatus );

export default router;