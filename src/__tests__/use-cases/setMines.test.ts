describe('use-cases/setMines', () => {
  const VALID_STATUS = ['waiting', 'win', 'lose']

  const minesMock = jest.fn((value) => mines = value)

  class GameMock {
    static getInstance = () => new GameMock()
    get status() { return status }
    set status(value) { status = value }
    get mines() { return mines }
    set mines(value) { minesMock(value) }
  }

  let mines: number
  let status: string
  let setMines: (mines: number) => void

  beforeEach(() => {
    jest.isolateModules(() => {
      jest.mock('domain/Game', () => GameMock)
      setMines = require('use-cases').setMines
    })
  })

  afterEach(() => jest.clearAllMocks())

  it('should do nothing if status is playing', () => {
    status = 'playing'
    setMines(10)
    expect(minesMock).not.toBeCalled()
  })

  it.each(VALID_STATUS)(
    'should set mines if status is %p',
    (validStatus) => {
      status = validStatus
      setMines(10)
      expect(minesMock).toBeCalledWith(10)
    })
})
