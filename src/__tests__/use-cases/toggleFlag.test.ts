describe('use-cases/toggleFlag', () => {
  const INVALID_STATUS = ['waiting', 'win', 'lose']

  const toggleFlagMock = jest.fn()

  let status: string
  let toggleFlag: (x: number, y: number) => void

  class GameMock {
    static getInstance = () => new GameMock()
    public toggleFlag = toggleFlagMock
    get status() { return status }
    set status(value) { status = value }
  }

  beforeEach(() => {
    jest.isolateModules(() => {
      jest.mock('domain/Game', () => GameMock)
      toggleFlag = require('use-cases').toggleFlag
    })
  })

  afterEach(() => jest.clearAllMocks())

  it('should toggle flag if status is playing', () => {
    status = 'playing'
    toggleFlag(2, 5)
    expect(toggleFlagMock).toBeCalledWith(2, 5)
  })

  it.each(INVALID_STATUS)(
    'should do nothing if status is %p',
    (invalidStatus) => {
      status = invalidStatus
      toggleFlag(3, 1)
      expect(toggleFlagMock).not.toBeCalled()
    })
})
