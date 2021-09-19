import Cell from 'domain/Cell'
import Game from 'domain/Game'
import { $ } from 'utils/dom'

export const setMineButtonListeners = (
  button: Element,
  cell: Cell,
  createOnOpen: (mines: number) => Element
): Element => {
  let minesAround = 0
  let hasMine = false

  const onMinesAroundChange = (newMinesAround: number) => minesAround = newMinesAround
  const onHasMineChange = (newHasMine: boolean) => hasMine = newHasMine
  const onHasFlagChange = (newHasFlag: boolean) =>
    $('rect', button)?.setAttribute('data-level', newHasFlag ? '3' : '0')
  const onIsOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      button.classList.remove('cgm-opened', 'cgm-exploded', 'cgm-flagged')
      $('.cgm-mines-around', button)?.remove()
    } else if (hasMine) {
      button.classList.add('cgm-exploded')
    } else {
      button.classList.add('cgm-opened')
      if (minesAround > 0) button.appendChild(createOnOpen(minesAround))
    }
  }

  cell.subscribe('minesAround', onMinesAroundChange)
  cell.subscribe('hasMine', onHasMineChange)
  cell.subscribe('hasFlag', onHasFlagChange)
  cell.subscribe('isOpen', onIsOpenChange)

  return button
}

export const setMinesColListeners = (
  col: Element,
  game: Game,
  delay: number
): Element => {
  game.subscribe('playing', function onPlaying() {
    setTimeout(() => col.classList.remove('cgm-hidden'), delay)
    game.unsubscribe('playing', onPlaying)
  })

  return col
}

export const setMinesGridListeners = (grid: Element, game: Game): Element => {
  game.subscribe('destroyed', () => grid.remove())
  game.subscribe('playing', function onPlaying() {
    grid.classList.add('cgm-started')
    game.unsubscribe('playing', onPlaying)
  })

  return grid
}
