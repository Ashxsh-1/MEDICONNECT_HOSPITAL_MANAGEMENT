

//Middleware to handle errors
class ErrorHandler extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

//Error Middleware
export const errorMiddleware = (err, req, res, next) => {
    err.message = err.message || "Internal Server Error";
    err.statusCode = err.statusCode || 500;

    //Handling Mongoose duplicate key
    if(err.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
        err = new ErrorHandler(message, 400);
    }

    //Handling wrong JWT error
    if(err.name ==="JsonWebTokenError") {
        const message = "Invalid JSON web token, Please try again!";
        err = new ErrorHandler(message, 400);
    }

    //Handling Expired JWT error
    if (err.name === "TokenExpiredError") {
        const message = "JSON web token expired, Please try again!";
        err = new ErrorHandler(message, 400);
    }

    //Handling Resource not found
    if (err.name === "CastError") {
        const message = `Resource not found. Invalid: ${err.path}`;
        err = new ErrorHandler(message, 400);
    }

    const errorMessage= err.errors ? Object.values(err.errors).map((error) => error.message).join(" ") : err.message;

    return res.status(err.statusCode).json({
        success: false,
        message: errorMessage,
    });
}

export default ErrorHandler;