import { ERROR_NO_BOARD, ERROR_NO_CONTROLS } from 'constants/literals'
import Game from 'domain/Game'

import createBoard from './createBoard'
import createControls from './createControls'
import * as selectors from './getElements'

const { getBoardContainer, getContributionsGrid, getControlsContainer } = selectors

const injectControls = (game: Game, dom: Document): void => {
  const container = getControlsContainer(dom)
  const controls = createControls(game, dom)

  if (!container) throw new Error(ERROR_NO_CONTROLS)

  container.prepend(controls)
}

const injectBoard = (game: Game, dom: Document): void => {
  const container = getBoardContainer(dom)
  const grid = getContributionsGrid(dom)
  
  if (!container || !grid) throw new Error(ERROR_NO_BOARD)
  
  const board = createBoard(game, dom, grid)

  container.replaceWith(board)
  board.prepend(container)
}

const injectGame = (game: Game, dom: Document): void => {
  injectControls(game, dom)
  injectBoard(game, dom)
}

export default injectGame
