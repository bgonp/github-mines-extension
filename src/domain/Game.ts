import Board from './Board'
import Cell from './Cell'
import Observable from './Observable'

class Game extends Observable {
  #mines = 0
  #board = new Board() as Board | null
  #hasLost = true
  #hasWon = true

  start(): void {
    if (this.playing || this.#mines === 0) return
    this.#hasLost = false
    this.#hasWon = false
    this.#board?.start(this.#mines)
    this.notify('playing')
    this.notify('flags')
  }

  flag(x: number, y: number): void {
    if (!this.playing) return
    this.#board?.flag(x, y)
    this.notify('flags')
  }

  open(x: number, y: number): void {
    if (!this.playing || !this.#board) return
    const board = this.#board
    board.open(x, y)
    if (board.solved) this.#hasWon = true
    if (board.exploded) this.#hasLost = true
    if (!this.playing) this.notify('playing')
  }

  destroy(): void {
    this.#mines = 0
    this.#hasLost = false
    this.#hasWon = false
    this.#board = null
    this.notify('destroyed')
  }

  get cells(): Cell[][] {
    return this.#board?.cells || []
  }

  get playing(): boolean {
    return this.#mines > 0 && !this.#hasLost && !this.#hasWon
  }

  get won(): boolean {
    return this.#hasWon && !this.#hasLost
  }

  get destroyed(): boolean {
    return this.#board === null
  }

  get flags(): number {
    return this.#board?.flags || 0
  }

  get mines(): number {
    return this.#mines
  }

  set mines(mines: number) {
    this.#mines = mines
    this.notify('mines')
  }
}

export default Game
