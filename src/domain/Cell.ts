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

  get hasMine(): boolean {
    return this.#hasMine
  }

  set hasMine(hasMine: boolean) {
    this.#hasMine = hasMine
    this.notify('hasMine')
  }

  get hasFlag(): boolean {
    return this.#hasFlag
  }

  set hasFlag(hasFlag: boolean) {
    this.#hasFlag = hasFlag
    this.notify('hasFlag')
  }

  get isOpen(): boolean {
    return this.#isOpen
  }

  set isOpen(isOpen: boolean) {
    this.#isOpen = isOpen
    this.notify('isOpen')
  }

  get minesAround(): number {
    return this.#minesAround
  }

  set minesAround(minesAround: number) {
    this.#minesAround = minesAround
    this.notify('minesAround')
  }
}

export default Cell
