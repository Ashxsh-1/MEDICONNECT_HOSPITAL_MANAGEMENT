import mongoose from "mongoose";
import validator from "validator";

//appointment schema
const appointmentSchema = new mongoose.Schema({
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
        maxLength: [12, "Aadhaar Number must contain exactly 12 digits"],
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
    appointment_date: {
        type: String,
        required: true,
    },
    department: {
        type: String,
        required: true,
    },
    doctor:{
        firstName:{
            type: String,
            required: true,
        },
        lastName:{
            type: String,
            required: true,
        },
    },
    hasVisited: {
        type: Boolean,
        default: false,
    },
    doctorId:{
        type: mongoose.Schema.ObjectId,
        required: true,
    },
    // Patient id not required
    // patientId:{
    //     type: mongoose.Schema.ObjectId,
    //     required: true,
    // },
    status: {
        type: String,
        enum: ["Pending", "Accepted", "Rejected"],
        default: "Pending",
    },
    address:{
        type: String,
    }
});

export const Appointment = mongoose.model("Appointment", appointmentSchema);