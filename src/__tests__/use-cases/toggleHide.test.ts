describe('use-cases/toggleHide', () => {
  const hiddenMock = jest.fn((value) => hidden = value)

  let hidden: boolean
  let toggleHide: () => void

  class GameMock {
    static getInstance = () => new GameMock()
    get hidden() { return hidden }
    set hidden(value) { hiddenMock(value) }
  }

  beforeEach(() => {
    jest.isolateModules(() => {
      jest.mock('domain/Game', () => GameMock)
      toggleHide = require('use-cases').toggleHide
    })
  })

  afterEach(() => jest.clearAllMocks())

  it('should hide if not hidden', () => {
    hidden = false
    toggleHide()
    expect(hiddenMock).toBeCalledWith(true)
  })

  it('should show if hidden', () => {
    hidden = true
    toggleHide()
    expect(hiddenMock).toBeCalledWith(false)
  })
})
