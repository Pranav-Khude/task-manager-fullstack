const { handleError } = require('../utils/errorHandler');

// Central error-handling middleware
const errorMiddleware = (err, req, res, next) => {
    handleError(err, res);
};

module.exports = errorMiddleware;
