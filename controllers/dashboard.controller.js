import dashboardService from '../services/dashboard.service.js';
import { ReE, ReS } from '../services/util.service.js';

const getDashboardStats = async (req, res) => {
    try {
        const stats = await dashboardService.getDashboardStats();
        return ReS(res, {
            message: "Dashboard stats fetched successfully",
            data: stats
        });
    } catch (error) {
        return ReE(res, error.message);
    }
};

const getNotifications = async (req, res) => {
    try {
        const notifications = await dashboardService.getNotifications();
        return ReS(res, {
            message: "Notifications fetched successfully",
            data: notifications
        });
    } catch (error) {
        return ReE(res, error.message);
    }
};

export { getDashboardStats, getNotifications };
