import express from "express";

import * as AdminController from "../../controllers/admin.controller.js";
import authMiddleware from "../../middleware/auth.middleware.js";

const router = express.Router();

// ================= CRUD =================

router.post(
    "/",
    AdminController.add
);

router.get(
    "/",
    AdminController.fetchAll
);

router.get(
    "/:id",
    AdminController.fetchSingle
);

router.put(
    "/:id",
    AdminController.update
);

router.delete(
    "/:id",
    AdminController.remove
);

router.patch(
    "/status/:id",
    AdminController.changeStatus
);

router.post(
    "/login", AdminController.login
);

router.post(
    "/refresh-token", AdminController.refreshToken
);

router.post(
    "/logout", authMiddleware, AdminController.logout
);

router.get(
    "/me", authMiddleware, AdminController.me
);

export default router;