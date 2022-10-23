import { globResolution } from './checkFileExistence'

jest.mock('../coreActions', () => ({
  getBooleanInput: jest.fn().mockReturnValue(false),
}))

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
