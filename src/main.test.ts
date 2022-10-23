import { Inputs } from './@enums'
import { action } from './main'
import {
  getMissingFiles,
  getPatterns,
  getTextInput,
  setFinalOutput,
} from './utils'

jest.mock('./utils', () => ({
  failExecution: jest.fn(),
  getMissingFiles: jest.fn(),
  getPatterns: jest.fn(),
  getTextInput: jest.fn(),
  setFinalOutput: jest.fn(),
}))

describe('Main action', () => {
  test('calls the necessary methods', async () => {
    await action()

    expect(getTextInput).toHaveBeenCalledWith(Inputs.FILES)

    expect(getPatterns).toHaveBeenCalled()

    expect(getMissingFiles).toHaveBeenCalled()

    expect(setFinalOutput).toHaveBeenCalled()
  })
})
