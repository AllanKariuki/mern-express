const errorHandler = (err, req, res, next) => {
    //ternary coe, to check if the statusCode exists and if not, pass in 500

    const statusCode = res.statusCode ? res.statusCode : 500

    res.status(statusCode)

    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    })
}

module.exports = {
    errorHandler,
}