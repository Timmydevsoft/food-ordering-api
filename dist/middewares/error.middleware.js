"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.customeError = exports.errorHandler = void 0;
class ExtendedErorr extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}
const errorHandler = (err, req, res, next) => {
    const statusCode = (err === null || err === void 0 ? void 0 : err.statusCode) || 500;
    const message = (err === null || err === void 0 ? void 0 : err.message) || "internal server error";
    res.status(statusCode).json({
        success: false,
        message: message,
        status: statusCode
    });
};
exports.errorHandler = errorHandler;
const customeError = (status, message) => {
    const error = new ExtendedErorr(message, status);
    error.statusCode = status;
    return error;
};
exports.customeError = customeError;
