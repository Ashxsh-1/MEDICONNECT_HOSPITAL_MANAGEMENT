import { Message } from "../models/messageSchema.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";

//Create new message and send
export const sendMessage = catchAsyncErrors(async (req, res, next) => {
    //Get data from frontend
    const { firstName, lastName, email, phone, message } = req.body;

    //Check whether any field is empty
    if (!firstName || !lastName || !email || !phone || !message) {
        return next(new ErrorHandler("Please enter all fields", 400));
    }

    //Create new message
    await Message.create({ firstName, lastName, email, phone, message });

    //message sent
    res.status(200).json({
        success: true,
        message: "Message sent successfully",
    });
});

//Get all messages
export const getAllMessages = catchAsyncErrors(async (req, res, next) => {
    const messages = await Message.find();
    res.status(200).json({
        success: true,
        messages
    });
})