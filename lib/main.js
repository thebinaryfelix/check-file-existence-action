"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.action = void 0;
const _enums_1 = require("~/@enums");
const utils_1 = require("~/utils");
const action = async () => {
    try {
        const inputFiles = (0, utils_1.getTextInput)(_enums_1.Inputs.FILES);
        const patterns = (0, utils_1.getPatterns)(inputFiles);
        (0, utils_1.setFinalOutput)(await (0, utils_1.getMissingFiles)(patterns));
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        (0, utils_1.failExecution)(error.message);
    }
};
exports.action = action;
(0, exports.action)();
