"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMissingFiles = void 0;
const checkFileExistence_1 = require("../checkFileExistence");
const coreActions_1 = require("../coreActions");
const getMissingFiles = async (patterns) => {
    const missingFiles = [];
    (0, coreActions_1.logInfo)(`Checking existence of files matching pattern: ${patterns}`);
    await Promise.all(patterns.map(async (pattern) => {
        const fileExists = await (0, checkFileExistence_1.checkFileExistence)(pattern);
        if (!fileExists) {
            missingFiles.push(pattern);
        }
    }));
    return missingFiles;
};
exports.getMissingFiles = getMissingFiles;
