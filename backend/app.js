import cookieParser from "cookie-parser";
import { config } from "dotenv";
import express from "express";
import fileUpload from "express-fileupload";
import { dbConnection } from "./database/dbConnection.js";
import cors from "cors";
import messageRouter from "./router/messageRouter.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import userRouter from "./router/userRouter.js";
import appointmentRouter from "./router/appointmentRouter.js";  



const app = express();

//ENV file set up
config({ path: "./config/config.env" });

//Middlewares

//cors is used to enable cross-origin resource sharing
//connectivity of frontend and backend
app.use(
    cors({
        origin: [process.env.FRONTEND_URL, process.env.DASHBOARD_URL],
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true
    })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
    })
);

//Routes
app.use("/api/v1/message", messageRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/appointment", appointmentRouter);


//Establishing the database connection
dbConnection();


//Error middleware will be used at last //IMP
app.use(errorMiddleware);

export default app;