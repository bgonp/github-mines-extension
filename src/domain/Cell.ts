import Observable from './Observable'

class Cell extends Observable {
  #hasMine = false
  #hasFlag = false
  #isOpen = false
  #minesAround = 0

  reset(): void {
    this.hasMine = false
    this.hasFlag = false
    this.isOpen = false
    this.minesAround = 0
  }

  set hasMine(hasMine: boolean) {
    this.#hasMine = hasMine
    this.notify('hasMine')
  }

  get hasMine(): boolean {
    return this.#hasMine
  }

  set hasFlag(hasFlag: boolean) {
    this.#hasFlag = hasFlag
    this.notify('hasFlag')
  }

  get hasFlag(): boolean {
    return this.#hasFlag
  }

  set isOpen(isOpen: boolean) {
    this.#isOpen = isOpen
    this.notify('isOpen')
  }

  get isOpen(): boolean {
    return this.#isOpen
  }

  set minesAround(minesAround: number) {
    this.#minesAround = minesAround
    this.notify('minesAround')
  }

  get minesAround(): number {
    return this.#minesAround
  }
}

export default Cell
