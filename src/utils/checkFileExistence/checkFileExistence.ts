import glob from 'glob'

import { Inputs } from '~/@enums'
import { getBooleanInput } from '~/utils'

export const checkFileExistence = async (
  pattern: string,
): Promise<Error | boolean> => {
  const globOptions = {
    nocase: getBooleanInput(Inputs.NO_CASE),
    follow: getBooleanInput(Inputs.FOLLOW),
  }

  return new Promise((resolve, reject) => {
    glob(pattern, globOptions, (error, files) => {
      if (error) {
        reject(error)
      } else {
        resolve(files.length > 0)
      }
    })
  })
}
