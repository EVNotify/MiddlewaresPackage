const axios = require('axios');

const asyncHandler = require('@evnotify/utils').asyncHandler;

module.exports = asyncHandler(async (req, res, next) => {
    if (!req.headers.authorization || !req.headers.authorization.length) {
        return next({
            "code": 400,
            "message": "Missing authorization header. Ensure that API Key is provided as Bearer token within Authorization header"
        });
    }
    const unauthorized = {
        "code": 401,
        "message": "Invalid authorization"
    };

    axios.post(process.env.AUTHORIZATION_SERVICE, {
        referer: {
            method: req.method,
            path: req.originalUrl,
            params: req.params
        }
    }, {
        headers: {
            'Authorization': req.headers.authorization
        }
    }).then(() => {
        next();
    }).catch((err) => {
        try {
            next(err.response.data.error || unauthorized);
        } catch (error) {
            console.error(error);
            next(unauthorized);
        }
    });
});