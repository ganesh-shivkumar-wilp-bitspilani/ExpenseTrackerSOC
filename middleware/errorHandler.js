const {constants} = require("../constants")
const errorHandler = ( err, req, res, next ) => {
    const statusCode = res.statusCode ? res.statusCode : 500;

    switch(statusCode) {
        case constants.BAD_REQUEST:
             res.json({ title: "Validation Failed", code: statusCode, message: err.message, stackTrace: err.stack});
        case constants.UNAUTHORIZED:
            res.json({ title: "Unauthorized", code: statusCode, message: err.message, stackTrace: err.stack});
        case constants.FORBIDDEN:
            res.json({ title: "Forbidden", code: statusCode, message: err.message, stackTrace: err.stack});
        case constants.NOT_FOUND:
            res.json({ title: "Not Found", code: statusCode, message: err.message, stackTrace: err.stack});
        case constants.INTERNAL_ERROR:
            res.json({ title: "Internal Server Error", code: statusCode, message: err.message, stackTrace: err.stack});
        default:
            break;
    }
    res.json({ message: err.message, code: statusCode, stackTrace: err.stack});
};

module.exports = errorHandler;

