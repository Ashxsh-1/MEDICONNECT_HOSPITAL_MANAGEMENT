import express from "express";
import { deleteAppointment, getAllAppointments, postAppointment, updateAppointmentStatus } from "../controller/appointmentController.js";
import { isAdminAuthenticated, isPatientAuthenticated } from "../middlewares/auth.js";


const router = express.Router();

//No need to check Patient Authentication as it is patient's own appointment without sign in
router.post("/post", postAppointment);

router.get("/getall", isAdminAuthenticated, getAllAppointments);

router.put("/update/:id", isAdminAuthenticated, updateAppointmentStatus);

router.delete("/delete/:id", isAdminAuthenticated, deleteAppointment);

export default router;