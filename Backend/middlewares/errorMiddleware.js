const ErrorResponse = require("../utils/ErrorResponse");

const errorHandler = (err,req,res,next) => {
    // console.log(err)
    let error = {...err};

    error.message = err.message    

    if(err.name === 'CastError'){
        const message = `BOOK not found for id ${err.value}`
        error = new ErrorResponse(message,404)
    }

    if(err.code === 11000){
        const message = `BOOK with this name ${err.keyValue.name} exits !! `;
        error = new ErrorResponse(message,400)
    }

    if(err.name === "ValidationError"){
        const message = Object.values(err.errors).map(val => val.message);
        error = new ErrorResponse(message,400)
    }
    
    res.status(error.statusCode || 500).json({
        success:false,
        error:error.message || 'Server Failed'
    })
}
module.exports = errorHandler