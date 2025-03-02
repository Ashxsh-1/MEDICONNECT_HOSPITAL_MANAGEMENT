import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";  
import { User } from "../models/userSchema.js";
import { generateToken } from "../utils/jwtToken.js";
import cloudinary from "cloudinary";

//Register new user
export const patientRegister = catchAsyncErrors(async (req, res, next) => {
    //Get data from frontend
    const { firstName, lastName, email, phone, password, confirmPassword, gender, aadhaar, dob, role } = req.body;

    //Check whether any field is empty
    if (!firstName || !lastName || !email || !phone || !password || !gender || !aadhaar || !dob || !role || !confirmPassword) {
        return next(new ErrorHandler("Please enter all the fields!", 400));
    }

    //find user
    let user = await User.findOne({ email });

    //Check whether user is already registered
    if (user) {
        return next(new ErrorHandler("User already registered!", 400));
    }

    //Check whether password and confirm password match   
    if (password !== confirmPassword) {
        return next(new ErrorHandler("Password and Confirm Password do not match!", 400));
    }

    //Create new user
    user = await User.create({ firstName, lastName, email, phone, password, gender, aadhaar, dob, role });

    //Generate token
    generateToken(user, "User registered!", 200, res);

    // //Send response
    // res.status(200).json({
    //     success: true,
    //     message: "User registered successfully",
    // });
});

//Login
export const login = catchAsyncErrors(async (req, res, next) => {
    //Get data from frontend
    const { email, password, role } = req.body;

    // console.log(email, password, role)

    //Check whether any field is empty
    if (!email || !password || !role) {
        return next(new ErrorHandler("Please enter all the fields!", 400));
    }
    
    // console.log("1");

    //Check whether password and confirm password match   
    // if (password !== confirmPassword) {
    //     return next(new ErrorHandler("Password and Confirm Password do not match!", 400));
    // }

    //find user
    const user = await User.findOne({ email }).select("+password");

    //Check whether user is not registered
    if (!user) {
        return next(new ErrorHandler("Invalid Email or Password!", 400));
    }

    //Check whether password is correct
    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid Email or Password!", 400));
    }

    //If role is not matched
    if (user.role !== role) {
        return next(new ErrorHandler("User with this role is not found!", 400));
    }

    //Generate token
    generateToken(user, "User registered!", 200, res);

    // console.log("Hello");

    //Send response
    // res.status(200).json({
    //     success: true,
    //     message: "User logged in successfully",
    // });
});

//Add new admin
export const addNewAdmin = catchAsyncErrors(async (req, res, next) => {
    //Get data from frontend
    const { firstName, lastName, email, phone, password, gender, aadhaar, dob } = req.body;

    //Check whether any field is empty
    if (!firstName || !lastName || !email || !phone || !password || !gender || !aadhaar || !dob) {
        return next(new ErrorHandler("Please enter all the fields!", 400));
    }

    const isRegistered = await User.findOne({ email });

    //Check whether user is already registered
    if (isRegistered) {
        return next(new ErrorHandler(`${isRegistered.role} with this email already exists!`, 400));
    }

    const admin = await User.create({ firstName, lastName, email, phone, password, gender, aadhaar, dob, role: "Admin" });

    res.status(200).json({
        success: true,
        message: "New admin Registered",
    });
})


//Get all doctors
export const getAllDoctors = catchAsyncErrors(async (req, res, next) => {
    const doctors = await User.find({ role: "Doctor" });
    res.status(200).json({
        success: true,
        doctors
    });
})

//Get user details
export const getUserDetails = catchAsyncErrors(async (req, res, next) => {
    const user = req.user;
    res.status(200).json({
        success: true,
        user
    });
})


//Logout Admin
export const logoutAdmin = catchAsyncErrors(async (req, res, next) => {
    res
        .status(200)
        .cookie("adminToken", "", {
            httpOnly: true,
            expires: new Date(Date.now()),
        })
        .json({
            success: true,
            message: "Admin logged out successfully!",
        })
})

//Logout Patient
export const logoutPatient = catchAsyncErrors(async (req, res, next) => {
    res
        .status(200)
        .cookie("patientToken", "", {
            httpOnly: true,
            expires: new Date(Date.now()),
        })
        .json({
            success: true,
            message: "Patient logged out successfully!",
        })
})

//Add new doctor
export const addNewDoctor = catchAsyncErrors(async (req, res, next) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return next(new ErrorHandler("Doctor Avatar Required!", 400));
    }

    const { docAvatar } = req.files;
    const allowedFormats = ["image/png", "image/jpg", "image/jpeg", "image/webp"];
    if (!allowedFormats.includes(docAvatar.mimetype)) {
        return next(new ErrorHandler("File format not supported!", 400));
    }

    const { firstName, lastName, email, phone, password, gender, aadhaar, dob, doctorDepartment } = req.body;

    if (!firstName || !lastName || !email || !phone || !password || !gender || !aadhaar || !dob || !doctorDepartment) {
        return next(new ErrorHandler("Please enter all the fields!", 400));
    }

    const isRegistered = await User.findOne({ email });

    if (isRegistered) {
        return next(new ErrorHandler(`${isRegistered.role} with this email already registered!`, 400));
    }

    const cloudinaryResponse = await cloudinary.uploader.upload(
        docAvatar.tempFilePath
    );

    if (!cloudinaryResponse || cloudinaryResponse.error) {
        console.error("Cloudinary error: ", cloudinaryResponse.error || "Unknown Cloudinary Error");
    }

    const doctor = await User.create({
        firstName, lastName, email, phone, password, gender, aadhaar, dob, role: "Doctor", doctorDepartment,
        docAvatar: {
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url,
        },
    });

    res.status(200).json({
        success: true,
        message: "New doctor Registered!",
        doctor
    });
});