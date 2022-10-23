import { failExecution, logInfo, setOutput } from '../coreActions'

export const setFinalOutput = (missingFiles: string[]): void => {
  const hasMissingFiles = missingFiles.length > 0

  if (hasMissingFiles) {
    const message = `❗️ Missing files: ${missingFiles.join(', ')}`
    failExecution(message)
  } else {
    const message = '🎉 All files exist!'
    logInfo(message)
  }

  setOutput(hasMissingFiles ? 'false' : 'true')
}
