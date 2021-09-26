import Board from './Board'
import Cell from './Cell'
import GameStatus from './GameStatus'
import Observable from './Observable'

class Game extends Observable {
  static #instance: Game

  #mines: number
  #board: Board
  #status: GameStatus
  #hidden: boolean

  private constructor() {
    super()
    this.#mines = 0
    this.#board = new Board()
    this.#status = 'waiting'
    this.#hidden = true
  }

  static getInstance(): Game {
    if (!Game.#instance) Game.#instance = new Game()
    return Game.#instance
  }

  start(): void {
    this.status = 'playing'
    this.hidden = false
    this.#board.start(this.#mines)
    this.notify('flags')
  }

  toggleFlag(x: number, y: number): void {
    this.#board.flag(x, y)
    this.notify('flags')
  }

  open(x: number, y: number): void {
    const board = this.#board
    board.open(x, y)
    if (board.solved) this.status = 'win'
    if (board.exploded) this.status = 'lose'
  }

  get cells(): Cell[][] {
    return this.#board.cells
  }

  get flags(): number {
    return this.#board.flags
  }

  get mines(): number {
    return this.#mines
  }

  set mines(mines: number) {
    if (this.#mines === mines) return
    this.#mines = mines
    this.notify('mines')
  }

  get status(): GameStatus {
    return this.#status
  }

  private set status(status: GameStatus) {
    this.#status = status
    this.notify('status')
  }

  get hidden(): boolean {
    return this.#hidden
  }

  set hidden(hidden: boolean) {
    if (this.#hidden === hidden) return
    this.#hidden = hidden
    this.notify('hidden')
  }
}

export default Game
