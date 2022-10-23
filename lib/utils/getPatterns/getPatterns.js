"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPatterns = void 0;
const _enums_1 = require("~/@enums");
const getPatterns = (input) => {
    if (!input) {
        throw new Error(_enums_1.ErrorMessages.INVALID_INPUT);
    }
    return input.split(',').map((str) => str.trim());
};
exports.getPatterns = getPatterns;
