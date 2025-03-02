import mongoose from "mongoose";
import validator from "validator";

//message schema
const messageSchema = new mongoose.Schema({
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
    message: {
        type: String,
        required: [true, "Please enter your message"],
        minLength: [10, "Message must contain at least 10 characters!"],
    },
});

export const Message = mongoose.model("Message", messageSchema);