import jwt from "jsonwebtoken";
import User from '../models/usermodel.js';
import AppError from "../utils/error.util.js";

/**
 * @isLoggedIn
 * FIX: Wrapped in try-catch to handle expired tokens without crashing the server.
 */
const isLoggedIn = async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return next(new AppError('Unauthenticated, please login again', 401));
    }

    try {
        // Verify token
        const userDetails = jwt.verify(token, process.env.JWT_SECRET);
        req.user = userDetails;
        next();
    } catch (error) {
        // If token is expired or invalid, catch the error and send 401
        return next(new AppError('Token expired or invalid, please login again', 401));
    }
};

/**
 * @authorizedRoles
 */
const authorizedRoles = (...roles) => async (req, res, next) => {
    const currentUserRole = req.user.role || req.user.roles;
    if (!roles.includes(currentUserRole)) {
        return next(new AppError("You do not have permission to access this route", 403));
    }
    next();
};

/**
 * @isInstructor
 */
const isInstructor = async (req, res, next) => {
    const currentUserRole = req.user.role || req.user.roles;
    if (currentUserRole !== 'INSTRUCTOR') {
        return next(new AppError('Only instructors can perform this action', 403));
    }
    next();
};

/**
 * @authorizedSubscriber
 * FIXES APPLIED:
 * 1. 'id' was undefined -> changed to req.user.id
 * 2. 'createError' was undefined -> changed to new AppError
 * 3. Added 'next()' at the end so the request doesn't hang if successful.
 */
const authorizedSubscriber = async (req, res, next) => {
    // We need to fetch the fresh user data from DB to check current subscription status
    // req.user comes from the token, which might have old data
    try {
        const user = await User.findById(req.user.id);

        if (!user) {
            return next(new AppError('User not found', 404));
        }

        const subscription = user.subscription.status;
        const currentUserRole = user.role;

        if (currentUserRole !== 'ADMIN' && subscription !== 'active') {
            return next(new AppError("Please subscribe to access this content", 403));
        }

        next(); // Proceed if authorized
    } catch (error) {
        return next(new AppError(error.message, 500));
    }
};

export {
    isLoggedIn,
    authorizedRoles,
    authorizedSubscriber,
    isInstructor,
};