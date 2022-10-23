import glob from 'glob'

import { Inputs } from '~/@enums'
import { getBooleanInput } from '~/utils'

export const globResolution =
  (
    resolve: (value: boolean | Error | PromiseLike<boolean | Error>) => void,
    reject: (reason: unknown) => void,
  ) =>
  (error: Error | null, files: string[]) => {
    if (error) {
      reject(error)
    } else {
      resolve(files.length > 0)
    }
  }

export const checkFileExistence = async (
  pattern: string,
): Promise<Error | boolean> => {
  const globOptions = {
    nocase: getBooleanInput(Inputs.NO_CASE),
    follow: getBooleanInput(Inputs.FOLLOW),
  }

  return new Promise((resolve, reject) => {
    glob(pattern, globOptions, globResolution(resolve, reject))
  })
}
