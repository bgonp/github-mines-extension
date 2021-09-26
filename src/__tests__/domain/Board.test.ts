import { COLS, ROWS } from 'constants/game'
import Board from 'domain/Board'

const INVALID_COORDS = [[100, 10], [10, 100], [-1, 10], [10, -1]]

let board: Board

const countMines = (board: Board): number => board.cells.reduce(
  (minesTotal, col) => minesTotal + col.reduce(
    (minesCol, cell) => minesCol + (cell.hasMine ? 1 : 0),
    0),
  0)

const findCellWithMine = (cells: Board['cells']): [number, number] | undefined => {
  for (let col = 0; col < cells.length; col++) {
    for (let row = 0; row < cells[0].length; row++) {
      if (!cells[col][row].hasMine) continue
      return [col, row]
    }
  }
}

describe('domain/Board', () => {
  beforeEach(() => board = new Board())

  it('should be built with default values', () => {
    expect(board.cells).toHaveLength(COLS)
    expect(board.cells[0]).toHaveLength(ROWS)
    expect(board.flags).toBe(0)
    expect(board.solved).toBe(false)
    expect(board.exploded).toBe(false)
  })

  it('should start with right mines amount', () => {
    board.start(10)
    const mines = countMines(board)

    expect(mines).toBe(10)
    expect(board.flags).toBe(10)
  })

  it('should not start if mines amount is above max', () => {
    board.start(200)
    const mines = countMines(board)

    expect(mines).toBe(0)
  })

  it('should toggle flag on cells', () => {
    board.start(10)
  
    board.flag(0, 0)
    board.flag(1, 2)
    expect(board.cells[0][0].hasFlag).toBe(true)
    expect(board.cells[1][2].hasFlag).toBe(true)

    board.flag(1, 2)
    expect(board.cells[0][0].hasFlag).toBe(true)
    expect(board.cells[1][2].hasFlag).toBe(false)

    expect(board.exploded).toBe(false)
    expect(board.solved).toBe(false)
  })

  it('should open cells and keep them opened', () => {
    board.start(10)
  
    board.open(5, 5)
    expect(board.cells[5][5].isOpen).toBe(true)
  
    board.open(5, 5)
    expect(board.cells[5][5].isOpen).toBe(true)
  })

  it('should not flag cell if it is open', () => {
    board.start(1)
  
    const y = 1
    const x = board.cells[1][y].hasMine ? 0 : 1
  
    board.open(x, y)
    board.flag(x, y)
    expect(board.cells[x][y].isOpen).toBe(true)
    expect(board.cells[x][y].hasFlag).toBe(false)
  })

  it('should not open cell if it has flag', () => {
    board.start(10)
  
    board.flag(2, 3)
    board.open(2, 3)
    expect(board.cells[2][3].hasFlag).toBe(true)
    expect(board.cells[2][3].isOpen).toBe(false)
  })

  it('should be exploded if open a cell with a mine', () => {
    board.start(100)
  
    const cellCoord = findCellWithMine(board.cells)
    expect(cellCoord).toBeDefined()
  
    board.open(...cellCoord!)
    expect(board.exploded).toBe(true)
  })

  it('should be solved if no more safe cells', () => {
    board.start(100)

    board.cells.forEach((col, x) => col.forEach((cell, y) => {
      if (!cell.hasMine) board.open(x, y)
    }))

    expect(board.exploded).toBe(false)
    expect(board.solved).toBe(true)
  })

  it.each(INVALID_COORDS)(
    'should not fail if trying to perform an out of bound action: %p %p',
    (x: number, y: number) => {
      board.start(20)

      expect(() => board.flag(x, y)).not.toThrow()
      expect(() => board.open(x, y)).not.toThrow()
    })
})