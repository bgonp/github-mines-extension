import Game from 'domain/Game'

export const setLabelButtonListeners = (button: Element, game: Game): Element => {
  const onPlayingChange = (playing: boolean) =>
    button.setAttribute('disabled', playing ? 'true' : 'false')
  game.subscribe('playing', onPlayingChange)

  return button
}

export const setMinesButtonListeners = (
  button: Element,
  game: Game,
  mines: number
): Element => {
  const onMinesChange = (newMines: number) =>
    button.setAttribute('aria-selected', newMines === mines ? 'true' : 'false')
  const onPlayingChange = (playing: boolean) =>
    button[playing ? 'setAttribute' : 'removeAttribute']('disabled', '')
  game.subscribe('mines', onMinesChange)
  game.subscribe('playing', onPlayingChange)

  return button
}

export const setPlayButtonListeners = (button: Element, game: Game): Element => {
  const onPlayingChange = (playing: boolean) =>
    button[playing ? 'setAttribute' : 'removeAttribute']('disabled', '')
  game.subscribe('playing', onPlayingChange)

  return button
}

export const setStatusSpanListeners = (
  span: Element,
  game: Game,
  messages: { win: string, lose: string }
): Element => {
  const onPlayingChange = (playing: boolean) => {
    if (playing) return
    if (game.won) span.textContent = messages.win
    else span.textContent = messages.lose
  }
  const onFlagsChange = (flags: number) => span.textContent = `${flags}`
  game.subscribe('playing', onPlayingChange)
  game.subscribe('flags', onFlagsChange)

  return span
}

export const setContainerListeners = (container: Element, game: Game): Element => {
  game.subscribe('destroyed', () => container.remove())

  return container
}
