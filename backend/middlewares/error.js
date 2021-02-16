const ErrorHandler = require('../utils/errorHandler')

module.exports =(err, req, res, next) => {
    // console.log('4 hello',err);
    err.statusCode = err.statusCode || 500
    // err.message = err.message || 'Internal Server Error'

    if(process.env.NODE_ENV === 'DEVELOPMENT'){
        
        // worng mongoose object id error
       if(err.name === 'CastError'){
           const message = `Resource not found.Invalid : ${err.path}`
            err = new ErrorHandler(message, 400)
       }
       // Handeling mongoose valdation error here
       if(err.name === 'ValidationError'){
        const message = Object.values(err.errors).map(value => value.message)
         err = new ErrorHandler(message, 400)
    }
        res.status(err.statusCode).json({
            success: false,
            // error: err,
            // stack: err.stack,
            errorMessage: err.message
        })
    }

    if(process.env.NODE_ENV ==='PRODUCTION'){
        let error = {...err}
        res.status(error.statusCode).json({
            success: false,
            message: error.message || 'Internal Server Error'
        })
    }
    // res.status(err.statusCode).json({
    //     success: false,
    //     error: err.stack || err
    // })
}