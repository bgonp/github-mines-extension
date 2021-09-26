describe('use-cases/observer', () => {
  const subscribeGameMock = jest.fn()
  const unsubscribeGameMock = jest.fn()
  const subscribeCellMock = jest.fn()
  const unsubscribeCellMock = jest.fn()
  const getCellMock = jest.fn((_x: number, _y: number) => ({
    subscribe: subscribeCellMock,
    unsubscribe: unsubscribeCellMock
  }))

  class GameMock {
    static getInstance = () => new GameMock()
    subscribe(prop: string, cb: () => void) { subscribeGameMock(prop, cb) }
    unsubscribe(prop: string, cb: () => void) { unsubscribeGameMock(prop, cb) }
    getCell(x: number, y: number) { return getCellMock(x, y) }
  }

  let subscribeGame: (prop: string, cb: () => void) => void
  let unsubscribeGame: (prop: string, cb: () => void) => void
  let subscribeCell: (x: number, y: number, prop: string, cb: () => void) => void
  let unsubscribeCell: (x: number, y: number, prop: string, cb: () => void) => void

  beforeEach(() => {
    jest.isolateModules(() => {
      jest.mock('domain/Game', () => GameMock)
      const observer = require('use-cases')
      subscribeGame = observer.subscribeGame
      unsubscribeGame = observer.unsubscribeGame
      subscribeCell = observer.subscribeCell
      unsubscribeCell = observer.unsubscribeCell
    })
  })

  afterEach(() => jest.clearAllMocks())

  it('should subscribe game', () => {
    const callback = () => {}
    subscribeGame('status', callback)
    expect(subscribeGameMock).toBeCalledWith('status', callback)
  })

  it('should unsubscribe game', () => {
    const callback = () => {}
    unsubscribeGame('status', callback)
    expect(unsubscribeGameMock).toBeCalledWith('status', callback)
  })

  it('should subscribe cell', () => {
    const callback = () => {}
    subscribeCell(1, 2, 'hasMine', callback)
    expect(getCellMock).toBeCalledWith(1, 2)
    expect(subscribeCellMock).toBeCalledWith('hasMine', callback)
  })

  it('should unsubscribe cell', () => {
    const callback = () => {}
    unsubscribeCell(3, 4, 'hasMine', callback)
    expect(getCellMock).toBeCalledWith(3, 4)
    expect(unsubscribeCellMock).toBeCalledWith('hasMine', callback)
  })
})
