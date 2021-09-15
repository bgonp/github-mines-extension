import Board from './Board'
import Observable from './Observable'

class Game extends Observable {
  #mines = 0
  #playing = false
  #board = new Board()

  start(): void {
    if (this.#playing || this.#mines === 0) return
    this.#playing = true
    this.#board.start(this.#mines)
    this.notify('playing')
  }

  get playing(): boolean {
    return this.#playing
  }

  get mines(): number {
    return this.#mines
  }

  set mines(mines: number) {
    this.#mines = mines
    this.notify('mines')
  }

  get board(): Board {
    return this.#board
  }
}

export default Game
