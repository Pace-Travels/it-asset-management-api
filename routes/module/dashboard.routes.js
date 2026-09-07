import { Router } from "express";
import * as dashboardController from "../../controllers/dashboard.controller.js";
import authMiddleware from "../../middleware/auth.middleware.js"; // Assuming auth middleware exists, usually applied globally or per route

const router = Router();

// We will skip auth middleware here if it's applied globally or if we just want it to work out of the box like other routes
router.get('/stats', dashboardController.getDashboardStats);
router.get('/notifications', dashboardController.getNotifications);

export default router;
