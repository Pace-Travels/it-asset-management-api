import rateLimit from "express-rate-limit";

export const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 Minutes
    max: 5, // Maximum 5 attempts per IP
    message: { 
        success: false, 
        error: "Too many login attempts. Please try again after 15 minutes." 
    }
});