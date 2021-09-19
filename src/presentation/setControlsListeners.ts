import { subscribe, unsubscribe } from 'application'
import GameStatus from 'domain/GameStatus'

const preventDestroyed = (callback: (status: GameStatus) => void) => {
  return (status: GameStatus) => {
    if (status === 'destroyed') return
    callback(status)
  }
}

export const setLabelButtonListeners = (button: Element): Element => {
  const onStatusChange = (status: GameStatus) => 
    button.setAttribute('disabled', status === 'playing' ? 'true' : 'false')
  subscribe('status', preventDestroyed(onStatusChange))

  return button
}

export const setMinesButtonListeners = (button: Element, mines: number): Element => {
  const onMinesChange = (newMines: number) =>
    button.setAttribute('aria-selected', newMines === mines ? 'true' : 'false')
  const onStatusChange = (status: GameStatus) => 
    button[status === 'playing' ? 'setAttribute' : 'removeAttribute']('disabled', '')
  subscribe('mines', onMinesChange)
  subscribe('status', preventDestroyed(onStatusChange))

  return button
}

export const setPlayButtonListeners = (button: Element): Element => {
  const onStatusChange = (status: GameStatus) => {
    if (status === 'playing') button.setAttribute('disabled', 'disabled')
    else button.removeAttribute('disabled')
  }
  const onMinesChange = () => {
    button.removeAttribute('disabled')
    unsubscribe('mines', onMinesChange)
  }
  subscribe('status', preventDestroyed(onStatusChange))
  subscribe('mines', onMinesChange)

  return button
}

export const setStatusSpanListeners = (
  span: Element,
  winMsg: string,
  loseMsg: string
): Element => {
  const onStatusChange = (status: GameStatus) => {
    if (status === 'win') span.textContent = winMsg
    else if (status === 'lose') span.textContent = loseMsg
  }
  const onFlagsChange = (flags: number) => span.textContent = `${flags}`
  subscribe('status', onStatusChange)
  subscribe('flags', onFlagsChange)

  return span
}

export const setContainerListeners = (container: Element): Element => {
  subscribe('status', (status: GameStatus) => {
    if (status === 'destroyed') container.remove()
  })

  return container
}
