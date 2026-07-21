import express from "express";
import * as employeeController from "../../controllers/employeeDetails.controller.js";

const router = express.Router();

/* ===========================================================
    Vendor Management
=========================================================== */

router.post("/",employeeController.add );

router.get("/", employeeController.fetchAll );

router.get("/:id", employeeController.fetchSingle );

router.put("/:id", employeeController.update );

router.delete("/:id", employeeController.remove );

router.patch("/:id", employeeController.changeStatus );

export default router;