import express from "express";
import authMiddleware from "../../middleware/auth.middleware.js";
import { loginLimiter } from "../../middleware/rateLimiter.js"; // Rate limiter import kiya
import {add, changeStatus, fetchAll, fetchSingle, login, logout, me, refreshToken, remove, update } from "../../controllers/admin.controller.js"

const router = express.Router();

// ================= AUTH ROUTES =================

// Rate limiter login route par add kiya (Brute-force protection)
router.post(
    "/login",
    // loginLimiter, 
    login
);

router.post(
    "/refresh-token",
    refreshToken
);

router.post(
    "/logout",
    authMiddleware,
    logout
);

router.get(
    "/me",
    authMiddleware,
    me
);

// ================= CRUD ROUTES =================

router.post(
    "/",
    authMiddleware, // Secured
    add
);

router.get(
    "/",
    authMiddleware, // Secured
    fetchAll
);

router.get(
    "/:id",
    authMiddleware, // Secured
    fetchSingle
);

router.put(
    "/:id",
    authMiddleware, // Secured
    update
);

router.delete(
    "/:id",
    authMiddleware, // Secured
    remove
);

router.patch(
    "/status/:id",
    authMiddleware, // Secured
    changeStatus
);

export default router;