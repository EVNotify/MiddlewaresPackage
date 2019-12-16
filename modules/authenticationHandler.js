const axios = require('axios');

const asyncHandler = require('@evnotify/utils').asyncHandler;

module.exports = asyncHandler(async (req, res, next) => {
    if (!req.headers.authorization || !req.headers.authorization.length) {
        return next({
            "code": 400,
            "message": "Missing authorization header. Ensure that API Key is provided as Bearer token within Authorization header"
        });
    }
    const unauthenticated = {
        "code": 401,
        "message": "Invalid authentication"
    };

    axios.post(process.env.AUTHENTICATION_SERVICE + '/verify/' + req.headers.akey, {}, {
        headers: {
            'Authorization': req.headers.authorization,
            'Authentication': req.headers.token
        }
    }).then(() => {
        next();
    }).catch((err) => {
        try {
            next(err.response.data.error || unauthenticated);
        } catch (error) {
            console.error(error);
            next(unauthenticated);
        }
    });
});