const authenticationHandler = require('./modules/authenticationHandler');
const authorizationHandler = require('./modules/authorizationHandler');
const errorHandler = require('./modules/errorHandler');

module.exports = {
    authenticationHandler,
    authorizationHandler,
    errorHandler
};