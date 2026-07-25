import express from "express";
import * as userRole from "../../controllers/userRole.controller.js";

const router = express.Router();

/* ===========================================================
    User Role
=========================================================== */

router.post(
    "/",
    userRole.add
);

router.get(
    "/",
    userRole.fetchAll
);

router.get(
    "/:id",
    userRole.fetchSingle
);

router.put(
    "/:id",
    userRole.update
);

router.delete(
    "/:id",
    userRole.remove
);

router.patch(
    "/:id",
    userRole.changeStatus
);

export default router;