import Board from './Board'
import Cell from './Cell'
import GameStatus from './GameStatus'
import Observable from './Observable'

class Game extends Observable {
  static #instance: Game

  #mines: number
  #board: Board
  #status: GameStatus

  private constructor() {
    super()
    this.#mines = 0
    this.#board = new Board()
    this.#status = 'waiting'
  }

  static getInstance(): Game {
    if (!Game.#instance) Game.#instance = new Game()
    return Game.#instance
  }

  start(): void {
    this.#status = 'playing'
    this.#board.start(this.#mines)
    this.notify('status')
    this.notify('flags')
  }

  flag(x: number, y: number): void {
    this.#board.flag(x, y)
    this.notify('flags')
  }

  open(x: number, y: number): void {
    const board = this.#board
    board.open(x, y)
    if (board.solved) this.#status = 'win'
    if (board.exploded) this.#status = 'lose'
    if (this.#status !== 'playing') this.notify('status')
  }

  destroy(): void {
    this.#status = 'destroyed'
    this.notify('status')
  }

  get cells(): Cell[][] {
    return this.#board.cells
  }

  get status(): GameStatus {
    return this.#status
  }

  get flags(): number {
    return this.#board.flags
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
