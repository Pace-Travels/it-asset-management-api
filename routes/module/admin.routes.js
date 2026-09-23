import express from "express";

import authMiddleware from "../../middleware/auth.middleware.js";

import {
    add,
    changeStatus,
    fetchAll,
    fetchSingle,
    getSidebar,
    login,
    logout,
    me,
    refreshToken,
    remove,
    update
} from "../../controllers/admin.controller.js";

const router = express.Router();

// =====================================================
// AUTH ROUTES
// =====================================================

// Login
router.post(
    "/login",
    // loginLimiter,
    login
);

// Refresh Token
router.post(
    "/refresh-token",
    refreshToken
);

// Logout
router.post(
    "/logout",
    authMiddleware,
    logout
);

// Sidebar
router.get(
    "/sidebar",
    authMiddleware,
    getSidebar
);

// Logged-in Admin Details
router.get(
    "/me",
    authMiddleware,
    me
);


// =====================================================
// CRUD ROUTES
// =====================================================

// Add Admin
router.post(
    "/",
    authMiddleware,
    add
);

// Get All Admins
router.get(
    "/",
    authMiddleware,
    fetchAll
);

// Get Single Admin
router.get(
    "/sidebar",
    authMiddleware, // Secured
    getSidebar
);

router.get(
    "/:id",
    authMiddleware,
    fetchSingle
);

// Update Admin
router.put(
    "/:id",
    authMiddleware,
    update
);

// Delete Admin
router.delete(
    "/:id",
    authMiddleware,
    remove
);

// Change Admin Status
router.patch(
    "/status/:id",
    authMiddleware,
    changeStatus
);

<<<<<<< HEAD
=======

// =====================================================
// EXPORT ROUTER
// =====================================================

>>>>>>> 85dbb95345aeef8ff43ed1d096b8e2f274690a07
export default router;