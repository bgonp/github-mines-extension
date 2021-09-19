import { subscribe, subscribeCell, unsubscribe } from 'application'
import GameStatus from 'domain/GameStatus'
import { $ } from 'utils/dom'

export const setMineButtonListeners = (
  button: Element,
  x: number,
  y: number,
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

  subscribeCell(x, y, 'minesAround', onMinesAroundChange)
  subscribeCell(x, y, 'hasMine', onHasMineChange)
  subscribeCell(x, y, 'hasFlag', onHasFlagChange)
  subscribeCell(x, y, 'isOpen', onIsOpenChange)

  return button
}

export const setMinesColListeners = (col: Element, delay: number): Element => {
  const onPlaying = (status: GameStatus) => {
    if (status !== 'playing') return
    setTimeout(() => col.classList.remove('cgm-hidden'), delay)
    unsubscribe('status', onPlaying)
  }
  subscribe('status', onPlaying)

  return col
}

export const setMinesGridListeners = (grid: Element): Element => {
  const onDestroyed = (status: GameStatus) => {
    if (status === 'destroyed') grid.remove()
  }
  const onPlaying = (status: GameStatus) => {
    if (status !== 'playing') return
    grid.classList.add('cgm-started')
    unsubscribe('status', onPlaying)
  }
  subscribe('status', onDestroyed)
  subscribe('status', onPlaying)

  return grid
}
