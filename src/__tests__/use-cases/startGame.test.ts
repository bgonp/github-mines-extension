describe('use-cases/startGame', () => {
  const VALID_STATUS = ['waiting', 'win', 'lose']

  const startMock = jest.fn()

  let status: string
  let mines: number
  let startGame: () => void

  class GameMock {
    static getInstance = () => new GameMock()
    public start = startMock
    get status() { return status }
    set status(value) { status = value }
    get mines() { return mines }
    set mines(value) { mines = value }
  }

  beforeEach(() => {
    jest.isolateModules(() => {
      jest.mock('domain/Game', () => GameMock)
      startGame = require('use-cases').startGame
    })
  })

  afterEach(() => jest.clearAllMocks())

  it.each(VALID_STATUS)(
    'should start game if mines greater than 0 and status is %p',
    (validStatus) => {
      status = validStatus
      mines = 30
      startGame()
      expect(startMock).toBeCalled()
    })

  it('should do nothing if no mines', () => {
    status = VALID_STATUS[0]
    mines = 0
    startGame()
    expect(startMock).not.toBeCalled()
  })

  it('should do nothing if invalid status', () => {
    status = 'playing'
    mines = 30
    startGame()
    expect(startMock).not.toBeCalled()
  })
})
