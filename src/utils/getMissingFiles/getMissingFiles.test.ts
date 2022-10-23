import { checkFileExistence } from '../checkFileExistence'
import { getMissingFiles } from './getMissingFiles'

jest.mock('../coreActions')
jest.mock('../checkFileExistence')

const mockedCheckFileExistence = jest.mocked(checkFileExistence)

describe('getMissingFiles', () => {
  test('returns the missing file array', async () => {
    const patterns = ['file1', 'file2']

    mockedCheckFileExistence.mockImplementation((value) => {
      const isFile1 = value.includes('1')

      return new Promise((resolve) => {
        resolve(isFile1)
      })
    })

    const missingFiles = await getMissingFiles(patterns)

    expect(missingFiles).toEqual(['file2'])
  })
})
