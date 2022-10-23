import { ErrorMessages } from '~/@enums'

import { getPatterns } from './getPatterns'

describe('getPatterns', () => {
  test('returns an array of trimmed strings', () => {
    const input = 'file_1.js, file_2.js   , file_3.js'

    const output = ['file_1.js', 'file_2.js', 'file_3.js']

    expect(getPatterns(input)).toEqual(output)
  })

  test('throws error if no input is informed', () => {
    expect(getPatterns).toThrow(ErrorMessages.INVALID_INPUT)
  })
})
