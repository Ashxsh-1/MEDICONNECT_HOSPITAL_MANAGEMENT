import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { Appointment } from "../models/appointmentSchema.js";
import { User } from "../models/userSchema.js";


//Create new appointment
export const postAppointment = catchAsyncErrors(async (req, res, next) => {
    const { firstName, lastName, email, phone, aadhaar, dob, gender, appointment_date, department, doctor_firstName, doctor_lastName, hasVisited, address } = req.body;

    //Check whether any field is empty
    // console.log(firstName, lastName, email, phone, aadhaar, dob, gender, appointment_date, department, doctor_firstName, doctor_lastName, hasVisited, address)

    //ERROR HERE
    if (!firstName || !lastName || !email || !phone || !aadhaar || !dob || !gender || !appointment_date || !department || !doctor_firstName || !doctor_lastName || !address) {
        return next(new ErrorHandler("Please enter all the fields!", 400));
    }

    //Check whether doctor is registered
    const isConflict = await User.find({
        firstName: doctor_firstName,
        lastName: doctor_lastName,
        role: "Doctor",
        doctorDepartment: department
    })

    if (isConflict.length === 0) {
        return next(new ErrorHandler("Doctor not found!", 404));
    }
    if (isConflict.length > 1) {
        return next(new ErrorHandler("Doctors Conflict! Please contact through Email or Phone!", 404));
    }

    const doctorId = isConflict[0]._id;
    //const patientId = req.user._id;
    //Patient might not be registered

    const appointment = await Appointment.create({
        firstName,
        lastName,
        email,
        phone,
        aadhaar,
        dob,
        gender,
        appointment_date,
        department,
        doctor: {
            firstName: doctor_firstName,
            lastName: doctor_lastName,
        },
        doctorId,
        //patientId,
        hasVisited,
        address
    });

    //appointment created
    res.status(200).json({
        success: true,
        message: "Appointment created successfully!",
        appointment,
    });
});

//Get all appointments
export const getAllAppointments = catchAsyncErrors(async (req, res, next) => {
    const appointments = await Appointment.find();
    res.status(200).json({
        success: true,
        appointments
    });
})

//Update appointment status
export const updateAppointmentStatus= catchAsyncErrors(async (req, res, next) => {
    const {id}= req.params;
    let appointment = await Appointment.findById(id);

    //Check whether appointment exists
    if (!appointment) {
        return next(new ErrorHandler("Appointment not found!", 404));
    }

    appointment= await Appointment.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    //appointment updated
    res.status(200).json({
        success: true,
        message: "Appointment status updated successfully!",
        appointment
    });
})

//Delete appointment
export const deleteAppointment = catchAsyncErrors(async (req, res, next) => {
    const {id}= req.params;
    let appointment = await Appointment.findById(id);

    //Check whether appointment exists
    if (!appointment) {
        return next(new ErrorHandler("Appointment not found!", 404));
    }
    await Appointment.deleteOne(id);

    //appointment deleted
    res.status(200).json({
        success: true,
        message: "Appointment deleted successfully!",
    });
})