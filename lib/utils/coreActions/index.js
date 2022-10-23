"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logInfo = exports.setOutput = exports.failExecution = exports.getTextInput = exports.getBooleanInput = void 0;
// eslint-disable-next-line @typescript-eslint/no-var-requires
const core = require('@actions/core');
const _enums_1 = require("~/@enums");
const executeCoreAction = {
    [_enums_1.CoreActionsInputType.BOOLEAN]: core.getBooleanInput,
    [_enums_1.CoreActionsInputType.TEXT]: core.getInput,
};
function makeGetInput(ofType) {
    return (label) => executeCoreAction[ofType]?.(label);
}
exports.getBooleanInput = makeGetInput(_enums_1.CoreActionsInputType.BOOLEAN);
exports.getTextInput = makeGetInput(_enums_1.CoreActionsInputType.TEXT);
const failExecution = (message) => {
    core.setFailed(message);
};
exports.failExecution = failExecution;
const setOutput = (value) => {
    core.setOutput(_enums_1.Outputs.EXISTS, value);
};
exports.setOutput = setOutput;
const logInfo = (message) => {
    core.info(message);
};
exports.logInfo = logInfo;
