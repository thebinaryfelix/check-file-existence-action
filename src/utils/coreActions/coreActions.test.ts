// eslint-disable-next-line @typescript-eslint/no-var-requires
const core = require('@actions/core')

import { Outputs } from '~/@enums'

import {
  failExecution,
  getBooleanInput,
  getTextInput,
  logInfo,
  setOutput,
} from './index'

jest.mock('@actions/core', () => ({
  getInput: jest.fn(),
  getBooleanInput: jest.fn(),
  info: jest.fn(),
  setFailed: jest.fn(),
  setOutput: jest.fn(),
}))

describe('Core Actions', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('getTextInput()', () => {
    test('calls core.getInput with correct label', () => {
      const label = 'test_label'

      getTextInput(label)

      expect(core.getInput).toHaveBeenCalledWith(label)
    })
  })

  describe('getBooleanInput()', () => {
    test('calls core.getBooleanInput with correct label', () => {
      const label = 'test_label'

      getBooleanInput(label)

      expect(core.getBooleanInput).toHaveBeenCalledWith(label)
    })
  })

  describe('logInfo()', () => {
    test('calls core.info with correct label', () => {
      const label = 'test_label'

      logInfo(label)

      expect(core.info).toHaveBeenCalledWith(label)
    })
  })

  describe('failExecution()', () => {
    test('calls core.setFailed with correct label', () => {
      const label = 'test_label'

      failExecution(label)

      expect(core.setFailed).toHaveBeenCalledWith(label)
    })
  })

  describe('setOutput()', () => {
    test('calls core.setOutput with correct key and value', () => {
      const value = 'output_value'

      setOutput(value)

      expect(core.setOutput).toHaveBeenCalledWith(Outputs.EXISTS, value)
    })
  })
})
