import brcrypt from "bcryptjs";
import mongoose from "mongoose";
import validator from "validator";
import jwt from "jsonwebtoken";

//user schema
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "Please enter your first name"],
        minLength: [3, "First name must contain at least 3 characters!"],
    },
    lastName: {
        type: String,
        required: [true, "Please enter your last name"],
        minLength: [3, "Last name must contain at least 3 characters!"],
    },
    email: {
        type: String,
        required: [true, "Please enter your email"],
        validate: [validator.isEmail, "Please enter a valid email!"],
    },
    phone: {
        type: String,
        required: [true, "Please enter your phone number"],
        minLength: [10, "Phone number must contain exactly 10 digits"],
        maxLength: [10, "Phone number must contain exactly 10 digits"],
        validate: [validator.isMobilePhone, "Please enter a valid phone number!"],
    },
    aadhaar: {
        type: String,
        required: [true, "Please enter your message"],
        minLength: [12, "Aadhaar Number must contain exactly 12 digits"],
        maxLength: [12, "Aadhaar Number exactly 12 digits"],
    },
    dob: {
        type: Date,
        required: [true, "Please enter your date of birth"],
    },
    gender: {
        type: String,
        required: [true, "Please enter your gender"],
        enum: {
           values: ["Male", "Female"],     
           message: "Please select a valid gender",
        },
    },
    password: {
        type: String,
        required: [true, "Please enter your password"],
        minLength: [8, "Password must contain at least 8 characters!"],
        select: false,
    },
    role: {
        type: String,
        required: [true, "Please enter your role"],
        enum: {
            values: ["Admin", "Patient", "Doctor"],
            message: "Please select a valid role",
        },
    },
    doctorDepartment: {
        type: String,
    },
    docAvatar: {
        public_id: String,
        url: String,
    },
});


//Hashing password
userSchema.pre("save", async function (next) {
    //if password is not modified
    if (!this.isModified("password")) {
        next(); //then move to next middleware
    }
    //if password is modified
    this.password = await brcrypt.hash(this.password, 10);
});

//Compare password
userSchema.methods.comparePassword= async function (enteredPassword) {
    //this.password is the hashed password of the user in the database
    return await brcrypt.compare(enteredPassword, this.password);
}

//Generate Json Web Token
userSchema.methods.generateJsonWebToken = function () {
    //this._id is the id of the user in the database 
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRES,
    });
};

export const User = mongoose.model("User", userSchema);