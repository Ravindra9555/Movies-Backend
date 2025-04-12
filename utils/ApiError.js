class ApiError extends Error {
    constructor(statusCode, message = "Internal Server Error", errors = [],stack = "") {
        super(message);
        this.statusCode = statusCode;
        this.message = message;
        this.data=null;
        this.error = errors;
    
        this.success = false;
         if(stack){
            this.stack = stack;
        } else{
            this.Error.captureStackTrace(this, this.constructor);
        }

    }
}
export { ApiError };