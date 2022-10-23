import { Inputs } from '~/@enums'
import {
  failExecution,
  getMissingFiles,
  getPatterns,
  getTextInput,
  setFinalOutput,
} from '~/utils'

const action = async () => {
  try {
    const inputFiles = getTextInput(Inputs.FILES)

    const patterns = getPatterns(inputFiles)

    setFinalOutput(await getMissingFiles(patterns))

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    failExecution(error.message)
  }
}
action()
