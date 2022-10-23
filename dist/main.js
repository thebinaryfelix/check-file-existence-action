"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkFileExistence = void 0;
// eslint-disable-next-line @typescript-eslint/no-var-requires
const core = require('@actions/core');
const glob_1 = __importDefault(require("glob"));
const checkFileExistence = async (pattern) => {
    const globOptions = {
        nocase: core.getBooleanInput('ignore_case'),
        follow: core.getBooleanInput('follow_symlinks'),
    };
    return new Promise((resolve, reject) => {
        (0, glob_1.default)(pattern, globOptions, (error, computedFiles) => {
            if (error) {
                reject(error);
            }
            else {
                resolve(computedFiles.length > 0);
            }
        });
    });
};
exports.checkFileExistence = checkFileExistence;
const run = async () => {
    const missingFiles = [];
    try {
        const inputFiles = core.getInput('files');
        core.info(`Checking existence of files matching patterns: ${inputFiles}`);
        const patterns = inputFiles
            .split(',')
            .map((file) => file.trim());
        await Promise.all(patterns.map(async (pattern) => {
            const fileExists = await (0, exports.checkFileExistence)(pattern);
            if (!fileExists) {
                missingFiles.push(pattern);
            }
        }));
        const hasMissingFiles = missingFiles.length > 0;
        if (hasMissingFiles) {
            core.setFailed(`Missing files: ${missingFiles.join(', ')}`);
            core.setOutput('files_exists', 'false');
        }
        else {
            core.info('All files exist');
            core.setOutput('files_exists', 'true');
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        core.setFailed(error.message);
    }
};
run();
