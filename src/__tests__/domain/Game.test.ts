import { COLS, ROWS } from 'constants/game'
import GameClass from 'domain/Game'

let Game: typeof GameClass

describe('domain/Game', () => {
  beforeEach(() => Game = require('domain/Game').default)

  afterEach(() => jest.resetModules())

  it('should be singleton', () => {
    const game1 = Game.getInstance()
    const game2 = Game.getInstance()
  
    expect(game1).toBe(game2)
  })

  it('should have a default state', () => {
    const game = Game.getInstance()
  
    expect(game.status).toBe('waiting')
    expect(game.hidden).toBe(true)
    expect(game.flags).toBe(0)
    expect(game.mines).toBe(0)
  })

  it('should start a game with initial state', () => {
    const game = Game.getInstance()
    game.mines = 10
    game.start()
  
    expect(game.status).toBe('playing')
    expect(game.hidden).toBe(false)
    expect(game.flags).toBe(10)
    expect(game.mines).toBe(10)
  })

  it('should set mines number and notify observers', () => {
    const observer = jest.fn()
    const game = Game.getInstance()

    game.subscribe('mines', observer)
    game.mines = 10
  
    expect(game.mines).toBe(10)
    expect(observer).toHaveBeenCalledWith(10)

    observer.mockClear()
    game.mines = 10
    expect(game.mines).toBe(10)
    expect(observer).not.toHaveBeenCalled()
  })

  it('should toggle flag and notify observers', () => {
    const observer = jest.fn()
    const game = Game.getInstance()

    game.subscribe('flags', observer)
    game.mines = 10
    game.start()
    expect(observer).toHaveBeenCalledWith(10)

    game.toggleFlag(1, 1)
    expect(game.getCell(1, 1).hasFlag).toBe(true)
    expect(observer).toHaveBeenCalledWith(9)

    game.toggleFlag(1, 1)
    expect(game.getCell(1, 1).hasFlag).toBe(false)
    expect(observer).toHaveBeenCalledWith(10)
  })

  it('should hide and notify observers', () => {
    const observer = jest.fn()
    const game = Game.getInstance()

    game.subscribe('hidden', observer)
    game.start()
    game.hidden = true
  
    expect(game.hidden).toBe(true)
    expect(observer).toHaveBeenCalledWith(true)
  
    observer.mockClear()
    game.hidden = true
    expect(observer).not.toHaveBeenCalled()
  })

  it('should open a cell', () => {
    const game = Game.getInstance()
    game.start()

    game.open(2, 3)
    expect(game.getCell(2, 3).isOpen).toBe(true)
  })

  it('should open a cell', () => {
    const game = Game.getInstance()
    game.start()
    game.open(4, 5)
    expect(game.getCell(4, 5).isOpen).toBe(true)
  })

  it('should lose the game and notify observers', () => {
    const observer = jest.fn()
    const game = Game.getInstance()
    game.mines = 10
    game.subscribe('status', observer)
    game.start()

    for (let x = 0; x < COLS; x++) {
      for (let y = 0; y < ROWS; y++) {
        const cell = game.getCell(x, y)
        if (cell.hasMine) {
          game.open(x, y)
          break
        }
      }
    }

    expect(game.status).toBe('lose')
    expect(observer).toHaveBeenCalledWith('lose')
  })

  it('should win the game and notify observers', () => {
    const observer = jest.fn()
    const game = Game.getInstance()
    game.mines = 50
    game.subscribe('status', observer)
    game.start()

    for (let x = 0; x < COLS; x++) {
      for (let y = 0; y < ROWS; y++) {
        const cell = game.getCell(x, y)
        if (!cell.hasMine) game.open(x, y)
      }
    }

    expect(game.status).toBe('win')
    expect(observer).toHaveBeenCalledWith('win')
  })
})