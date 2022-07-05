"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const validate = joi_1.default.object({
    boletoNumber: joi_1.default.string()
        .length(48)
        .pattern(/^[0-9]+$/, 'only numbers')
        .required()
});
exports.default = validate;
