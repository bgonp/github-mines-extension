import isProfilePage from 'utils/isProfilePage'

const VALID_PATHNAMES = ['/username', '/user-name']
const INVALID_PATHNAMES = ['/username/project', '/', '']

let locationBackup: Location
const mockLocation = { ...window.location, pathname: '' }

describe('utils/isProfilePage', () => {
  beforeAll(() => {
    locationBackup = window.location
    Object.defineProperty(window, 'location', { value: mockLocation })
  })

  afterAll(() => {
    Object.defineProperty(window, 'location', { value: locationBackup })
  })

  it.each(VALID_PATHNAMES)(
    'should return true if url is profile: %p',
    (pathname) => {
      mockLocation.pathname = pathname
      expect(isProfilePage()).toBe(true)
    }
  )

  it.each(INVALID_PATHNAMES)(
    'should return false if url is not profile: %p',
    (pathname) => {
      mockLocation.pathname = pathname
      expect(isProfilePage()).toBe(false)
    }
  )
})
