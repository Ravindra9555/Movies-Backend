  const errorHandler =(err, req, res, next)=>{
    const statusCode= err.statusCode ||500;
    return res.status(statusCode).json({
        success: false,
        message: err.message || "Internal Server Error",
        error: err.error ||[],
        stack: process.env.NODE_ENV === "production" ? null : err.stack,
    })
  }
export default errorHandler;
