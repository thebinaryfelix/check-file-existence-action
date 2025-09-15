import { failExecution, logInfo, setOutput } from '../coreActions'
import { setFinalOutput } from './setFinalOutput'

jest.mock('../coreActions', () => ({
  failExecution: jest.fn(),
  logInfo: jest.fn(),
  setOutput: jest.fn(),
}))

describe('setFinalOutput', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('calls core actions with correct arguments if has missing files', () => {
    const missingFileName = 'missing_file_1'

    setFinalOutput([missingFileName])

    expect(logInfo).toHaveBeenCalledWith(
      expect.stringContaining('Missing files:'),
    )

    expect(setOutput).toHaveBeenCalledWith('false')

    expect(failExecution).not.toHaveBeenCalled()
  })

  test('calls core actions with correct arguments if no file is missing', () => {
    setFinalOutput([])

    expect(logInfo).toHaveBeenCalledWith(
      expect.stringContaining('All files exist'),
    )

    expect(setOutput).toHaveBeenCalledWith('true')

    expect(failExecution).not.toHaveBeenCalled()
  })
})
