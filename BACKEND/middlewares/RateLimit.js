
const rateLimit = require("express-rate-limit");

// General API limiter
exports.GeneralRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
    message: {
        success: false,
        error: "Too many requests. Please try again later.",
    },
    standardHeaders: true,
    legacyHeaders: false,
});

// Authentication limiter
exports.AuthLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5,
    message: {
        success: false,
        error: "Too many authentication attempts. Please try again later.",
    },
    standardHeaders: true,
    legacyHeaders: false,
});

// Resource creation limiter
exports.CreateLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 20,
    message: {
        success: false,
        error: "You are creating resources too quickly. Please try again later.",
    },
    standardHeaders: true,
    legacyHeaders: false,
});
