"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setFinalOutput = void 0;
const coreActions_1 = require("../coreActions");
const setFinalOutput = (missingFiles) => {
    const hasMissingFiles = missingFiles.length > 0;
    if (hasMissingFiles) {
        const message = `❗️ Missing files: ${missingFiles.join(', ')}`;
        (0, coreActions_1.failExecution)(message);
    }
    else {
        const message = '🎉 All files exist!';
        (0, coreActions_1.logInfo)(message);
    }
    (0, coreActions_1.setOutput)(hasMissingFiles ? 'false' : 'true');
};
exports.setFinalOutput = setFinalOutput;
