import { checkFileExistence } from '../checkFileExistence'
import { logInfo } from '../coreActions'

export const getMissingFiles = async (
  patterns: string[],
): Promise<string[]> => {
  const missingFiles: string[] = []

  logInfo(`Checking existence of files matching pattern: ${patterns}`)

  await Promise.all(
    patterns.map(async (pattern: string) => {
      const fileExists = await checkFileExistence(pattern)

      if (!fileExists) {
        missingFiles.push(pattern)
      }
    }),
  )

  return missingFiles
}
