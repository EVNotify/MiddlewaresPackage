module.exports = (err, req, res, next ) => {
    if (!err) err = new Error();

    console.error('An error occurred on ' + req.method + ' ' + req.url, err);

    if (res.headersSent) return next(err);
    const status = parseInt(err.status || err.code) || 500;

    res.status(status >= 400 && status < 600 ? status : 422).json({
        error: process.env.NODE_ENV === 'development' ? err : status === 500 ? "Internal error" : "Unprocessable entity"
    });
};