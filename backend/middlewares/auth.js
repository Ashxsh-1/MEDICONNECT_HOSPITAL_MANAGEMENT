import { catchAsyncErrors } from "./catchAsyncErrors.js";
import jwt from "jsonwebtoken";
import { User } from "../models/userSchema.js"; 
import ErrorHandler from "../middlewares/errorMiddleware.js";  

//Check if user is authenticated
export const isAdminAuthenticated = catchAsyncErrors(async (req, res, next) => {
    const token = req.cookies.adminToken;

    if (!token) {
        return next(new ErrorHandler("Admin not authenticated!", 400));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.user = await User.findById(decoded.id);
    if (req.user.role !== "Admin") {
        return next(
            new ErrorHander(
                `${req.user.role} is not authorized to access this resource!`,
                403
            )
        );
    }

    next();
});

//Check if user is authenticated
export const isPatientAuthenticated = catchAsyncErrors(async (req, res, next) => {
    const token = req.cookies.patientToken;

    if (!token) {
        return next(new ErrorHandler("Patient not authenticated!", 400));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.user = await User.findById(decoded.id);
    if (req.user.role !== "Patient") {
        return next(
            new ErrorHander(
                `${req.user.role} is not authorized to access this resource!`,
                403
            )
        );
    }

    next();
});