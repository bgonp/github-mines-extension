import isProfilePage from './isProfilePage'

describe('utils/isProfilePage', () => {
  it('should return true if url is profile', () => {
    expect(isProfilePage('/username')).toBe(true)
    expect(isProfilePage('/user-name')).toBe(true)
  })
  
  it('should return false if url is not profile', () => {
    expect(isProfilePage('/username/project')).toBe(false)
    expect(isProfilePage('/')).toBe(false)
    expect(isProfilePage('')).toBe(false)
  })
})
