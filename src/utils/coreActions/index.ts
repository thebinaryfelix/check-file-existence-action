// eslint-disable-next-line @typescript-eslint/no-var-requires
const core = require('@actions/core')

import { CoreActionsInputType, Outputs } from '~/@enums'

const executeCoreAction = {
  [CoreActionsInputType.BOOLEAN]: core.getBooleanInput,
  [CoreActionsInputType.TEXT]: core.getInput,
}

function makeGetInput<T>(ofType: CoreActionsInputType): (label: string) => T {
  return (label: string): T => executeCoreAction[ofType]?.(label)
}

export const getBooleanInput = makeGetInput<boolean>(
  CoreActionsInputType.BOOLEAN,
)

export const getTextInput = makeGetInput<string>(CoreActionsInputType.TEXT)

export const failExecution = (message: string) => {
  core.setFailed(message)
}

export const setOutput = (value: string) => {
  core.setOutput(Outputs.EXISTS, value)
}

export const logInfo = (message: string) => {
  core.info(message)
}
