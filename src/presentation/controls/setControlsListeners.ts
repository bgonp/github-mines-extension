import { subscribeGame, unsubscribeGame } from 'application'
import GameStatus from 'domain/GameStatus'

export const setStatusSpanListeners = (
  span: Element,
  winMsg: string,
  loseMsg: string,
  hiddenMsg: string
): void => {
  let lastTextContent = ''

  const onFlagsChange = (flags: number) => span.textContent = `${flags}`
  const onHiddenChange = (hidden: boolean) => {
    if (hidden) {
      lastTextContent = span.textContent || ''
      span.textContent = hiddenMsg
    } else {
      span.textContent = lastTextContent
    }
  }
  const onStatusChange = (status: GameStatus) => {
    if (status === 'win') span.textContent = winMsg
    else if (status === 'lose') span.textContent = loseMsg
  }

  subscribeGame('flags', onFlagsChange)
  subscribeGame('hidden', onHiddenChange)
  subscribeGame('status', onStatusChange)
}

export const setLabelButtonListeners = (button: Element): void => {
  const onStatusChange = (status: GameStatus) => 
    button[status === 'playing' ? 'setAttribute' : 'removeAttribute']('disabled', '')
  subscribeGame('status', onStatusChange)
}

export const setMinesButtonListeners = (button: Element, mines: number): void => {
  const onMinesChange = (newMines: number) =>
    button.setAttribute('aria-selected', newMines === mines ? 'true' : 'false')
  const onStatusChange = (status: GameStatus) =>
    button[status === 'playing' ? 'setAttribute' : 'removeAttribute']('disabled', '')

  subscribeGame('mines', onMinesChange)
  subscribeGame('status', onStatusChange)
}

export const setPlayButtonListeners = (button: Element): void => {
  const onMinesChange = () => {
    button.removeAttribute('disabled')
    button.removeAttribute('aria-label')
    button.classList.remove('tooltipped')
    unsubscribeGame('mines', onMinesChange)
  }
  const onStatusChange = (status: GameStatus) => {
    if (status === 'playing') button.setAttribute('disabled', 'disabled')
    else button.removeAttribute('disabled')
  }

  subscribeGame('mines', onMinesChange)
  subscribeGame('status', onStatusChange)
}

export const setHideButtonListeners = (
  button: Element,
  showIcon: Element,
  hideIcon: Element
): void => {
  const onHiddenChange = (hidden: boolean) => {
    button.removeChild(hidden ? showIcon : hideIcon)
    button.appendChild(hidden ? hideIcon : showIcon)
  }
  const onStatusChange = () => {
    button.removeAttribute('disabled')
    unsubscribeGame('status', onStatusChange)
  }

  subscribeGame('hidden', onHiddenChange)
  subscribeGame('status', onStatusChange)
}