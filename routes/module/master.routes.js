import express from "express";
import MasterController from "../../controllers/master.controller.js";
import validationMiddleware from "../../middleware/validation.middleware.js";
import MasterValidation from "../../validation/master.validation.js";

const router = express.Router();

/*
|--------------------------------------------------------------------------
| Set Module Name Middleware
|--------------------------------------------------------------------------
*/

router.param("module", (req, res, next, module) => {
    req.masterModel = module;
    next();

});

/*
|--------------------------------------------------------------------------
| CRUD
|--------------------------------------------------------------------------
*/

router.get("/:module", MasterController.getAll);

router.get("/:module/:id", MasterController.getById);

router.post("/:module", validationMiddleware(MasterValidation.add), MasterController.create);

router.put("/:module/:id", validationMiddleware(MasterValidation.update), MasterController.update);

router.delete("/:module/:id", MasterController.delete);

router.patch("/:module/:id/status", validationMiddleware(MasterValidation.changeStatus), MasterController.changeStatus);

export default router;