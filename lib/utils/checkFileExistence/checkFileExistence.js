"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkFileExistence = exports.globResolution = void 0;
const glob_1 = __importDefault(require("glob"));
const _enums_1 = require("~/@enums");
const utils_1 = require("~/utils");
const globResolution = (resolve, reject) => (error, files) => {
    if (error) {
        reject(error);
    }
    else {
        resolve(files.length > 0);
    }
};
exports.globResolution = globResolution;
const checkFileExistence = async (pattern) => {
    const globOptions = {
        nocase: (0, utils_1.getBooleanInput)(_enums_1.Inputs.NO_CASE),
        follow: (0, utils_1.getBooleanInput)(_enums_1.Inputs.FOLLOW),
    };
    return new Promise((resolve, reject) => {
        (0, glob_1.default)(pattern, globOptions, (0, exports.globResolution)(resolve, reject));
    });
};
exports.checkFileExistence = checkFileExistence;
