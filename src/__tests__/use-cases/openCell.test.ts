describe('use-cases/openCell', () => {
  const INVALID_STATUS = ['waiting', 'win', 'lose']

  const openMock = jest.fn()

  let status: string
  let openCell: (x: number, y: number) => void

  class GameMock {
    static getInstance = () => new GameMock()
    public open = openMock
    get status() { return status }
    set status(value) { status = value }
  }

  beforeEach(() => {
    jest.isolateModules(() => {
      jest.mock('domain/Game', () => GameMock)
      openCell = require('use-cases').openCell
    })
  })

  afterEach(() => jest.clearAllMocks())

  it('should open cell if status is playing', () => {
    status = 'playing'
    openCell(1, 2)
    expect(openMock).toBeCalledWith(1, 2)
  })

  it.each(INVALID_STATUS)(
    'should do nothing if status is %p',
    (invalidStatus) => {
      status = invalidStatus
      openCell(1, 2)
      expect(openMock).not.toBeCalled()
    })
})
