"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const get_1 = __importDefault(require("./schema/get"));
const inputValidate = (event) => {
    var _a, _b, _c;
    const input = Object.assign(Object.assign(Object.assign({}, JSON.parse(event.body || '{}')), event.pathParameters), event.queryStringParameters);
    const options = {
        abortEarly: false
    };
    let schema = null;
    switch ((_c = (_b = (_a = event === null || event === void 0 ? void 0 : event.requestContext) === null || _a === void 0 ? void 0 : _a.http) === null || _b === void 0 ? void 0 : _b.method) === null || _c === void 0 ? void 0 : _c.toLowerCase()) {
        case 'get':
            schema = get_1.default;
            break;
    }
    if (schema) {
        const { error } = schema.validate(input, options);
        if (error) {
            const message = error.details.map((detail) => detail.message.replace(/(")|(")/g, ''));
            throw { message, code: 400 };
        }
    }
};
exports.default = inputValidate;
