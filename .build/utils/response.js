"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorResponse = exports.responseClient = void 0;
const responseClient = (data, status = 200) => {
    return {
        statusCode: status,
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            status,
            data
        }, null, 2)
    };
};
exports.responseClient = responseClient;
const errorResponse = (error) => {
    let code = 500;
    // FOR DEBUGGING
    console.log('ERROR ========================>', error, '<======================== ERROR');
    if (Number.isInteger(error === null || error === void 0 ? void 0 : error.code)) {
        code = error.code;
    }
    const message = code !== 500
        ? (error === null || error === void 0 ? void 0 : error.message) || 'Internal server error'
        : 'Internal server error';
    const data = {
        error: true,
        message
    };
    return (0, exports.responseClient)(data, code);
};
exports.errorResponse = errorResponse;
