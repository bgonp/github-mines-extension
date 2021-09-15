import Cell from './Cell'

const COLS = 53
const ROWS = 7

class Board {
  #cells: Cell[][];

  constructor() {
    this.initCells()
  }

  start(mines: number): void {
    this.initMines(mines)
    this.initClues()
  }

  get cells(): Cell[][] {
    return this.#cells
  }

  private initCells() {
    this.#cells = []
    for (let i = 0; i < COLS; i++) {
      this.#cells.push([])
      for (let j = 0; j < ROWS; j++) {
        this.#cells[i].push(new Cell())
      }
    }
  }

  private initMines(mines: number) {
    // TODO
    console.log(mines)
  }

  private initClues() {
    // TODO
  }
}

export default Board
