import { COLS, ROWS } from 'constants/game'
import Cell from './Cell'
class Board {
  #cells: Cell[][]
  #safeCells = 0
  #flags = 0
  #solved = false
  #exploded = false

  constructor() {
    this.#cells = []
    for (let i = 0; i < COLS; i++) {
      this.#cells.push([])
      for (let j = 0; j < ROWS; j++) {
        this.#cells[i].push(new Cell())
      }
    }
  }

  start(mines: number): void {
    this.#safeCells = COLS * ROWS - mines
    this.#flags = mines
    this.#solved = false
    this.#exploded = false
    this.resetCells()
    this.initMines(mines)
  }

  flag(x: number, y: number): void {
    if (this.outOfBounds(x, y)) return

    const cell = this.#cells[x][y]
    if (cell.isOpen) return

    cell.hasFlag = !cell.hasFlag
    this.#flags += cell.hasFlag ? -1 : 1
  }

  open(x: number, y: number): void {
    if (this.outOfBounds(x, y)) return

    const cell = this.#cells[x][y]
    if (cell.isOpen || cell.hasFlag) return

    cell.isOpen = true
    this.#safeCells--

    if (cell.hasMine) this.#exploded = true
    else if (this.#safeCells === 0) this.#solved = true
    else if (cell.minesAround === 0) this.openAround(x, y)
  }

  get solved(): boolean {
    return this.#solved
  }

  get exploded(): boolean {
    return this.#exploded
  }

  get flags(): number {
    return this.#flags
  }

  get cells(): Cell[][] {
    return this.#cells
  }

  private openAround(x: number, y: number) {
    for (let i = x - 1; i <= x + 1; i++) {
      for (let j = y - 1; j <= y + 1; j++) {
        if (i === x || j === y) continue
        this.open(i, j)
      }
    }
  }

  private outOfBounds(x: number, y: number): boolean {
    return x < 0 || x >= COLS || y < 0 || y >= ROWS
  }

  private resetCells() {
    for (let i = 0; i < COLS; i++) {
      for (let j = 0; j < ROWS; j++) {
        this.#cells[i][j].reset()
      }
    }
  }

  private initMines(mines: number) {
    for(let i = 0; i < mines; i++) {
      let x, y
      do {
        x = Math.floor(Math.random() * COLS)
        y = Math.floor(Math.random() * ROWS)
      } while (this.#cells[x][y].hasMine)
      this.#cells[x][y].hasMine = true
      this.setMinesAround(x, y)
    }
  }

  private setMinesAround(x: number, y: number) {
    for (let i = x - 1; i <= x + 1; i++) {
      for (let j = y - 1; j <= y + 1; j++) {
        if (this.outOfBounds(i, j)) continue
        this.#cells[i][j].minesAround++
      }
    }
  }
}

export default Board
