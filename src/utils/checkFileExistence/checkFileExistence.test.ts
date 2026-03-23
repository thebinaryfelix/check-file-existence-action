import glob from 'glob'

import { Inputs } from '~/@enums'

import { getBooleanInput } from '../coreActions'
import { checkFileExistence, globResolution } from './checkFileExistence'

jest.mock('glob')
jest.mock('../coreActions', () => ({
  getBooleanInput: jest.fn().mockReturnValue(false),
}))

const mockedGlob = jest.mocked(glob)

const mockedGetBooleanInput = jest.mocked(getBooleanInput)

describe('checkFileExistence', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('calls getBooleanInput with correct input names', async () => {
    mockedGlob.mockImplementation((_pattern, _options, callback) => {
      callback(null, ['file1'])
      return {} as ReturnType<typeof glob>
    })

    await checkFileExistence('some-pattern')

    expect(mockedGetBooleanInput).toHaveBeenCalledWith(Inputs.NO_CASE)
    expect(mockedGetBooleanInput).toHaveBeenCalledWith(Inputs.FOLLOW)
  })

  test('resolves to true when glob finds files', async () => {
    mockedGlob.mockImplementation((_pattern, _options, callback) => {
      callback(null, ['file1'])
      return {} as ReturnType<typeof glob>
    })

    const result = await checkFileExistence('some-pattern')

    expect(result).toBe(true)
  })

  test('resolves to false when glob finds no files', async () => {
    mockedGlob.mockImplementation((_pattern, _options, callback) => {
      callback(null, [])
      return {} as ReturnType<typeof glob>
    })

    const result = await checkFileExistence('some-pattern')

    expect(result).toBe(false)
  })

  test('rejects when glob returns an error', async () => {
    const error = new Error('glob_error')

    mockedGlob.mockImplementation((_pattern, _options, callback) => {
      callback(error, [])
      return {} as ReturnType<typeof glob>
    })

    await expect(checkFileExistence('some-pattern')).rejects.toThrow(
      'glob_error',
    )
  })

  test('passes nocase and follow options from getBooleanInput to glob', async () => {
    mockedGetBooleanInput.mockReturnValueOnce(true).mockReturnValueOnce(false)

    mockedGlob.mockImplementation((_pattern, options, callback) => {
      callback(null, [])
      return {} as ReturnType<typeof glob>
    })

    await checkFileExistence('some-pattern')

    expect(mockedGlob).toHaveBeenCalledWith(
      'some-pattern',
      { nocase: true, follow: false },
      expect.any(Function),
    )
  })
})

describe('globResolution', () => {
  test('calls correct method with true if files array is not empty', () => {
    const handleResolve = jest.fn()
    const handleReject = jest.fn()

    const callback = globResolution(handleResolve, handleReject)

    callback(null, ['file1', 'file2'])

    expect(handleResolve).toHaveBeenCalledWith(true)
    expect(handleReject).not.toHaveBeenCalled()
  })

  test('calls correct method with false if files array is empty', () => {
    const handleResolve = jest.fn()
    const handleReject = jest.fn()

    const callback = globResolution(handleResolve, handleReject)

    callback(null, [])

    expect(handleResolve).toHaveBeenCalledWith(false)
    expect(handleReject).not.toHaveBeenCalled()
  })

  test('calls correct method for handling error', () => {
    const handleResolve = jest.fn()
    const handleReject = jest.fn()

    const callback = globResolution(handleResolve, handleReject)

    const error = new Error('test_error')

    callback(error, [])

    expect(handleReject).toHaveBeenCalledWith(error)
    expect(handleResolve).not.toHaveBeenCalled()
  })
})
