import { ErrorMessages } from '~/@enums'

export const getPatterns = (input: string): string[] => {
  if (!input) {
    throw new Error(ErrorMessages.INVALID_INPUT)
  }

  return input.split(',').map((str: string) => str.trim())
}
