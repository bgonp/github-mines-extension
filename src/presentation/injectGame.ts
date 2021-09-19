import { ERROR_NO_BOARD, ERROR_NO_CONTROLS } from 'constants/literals'

import createBoard from './createBoard'
import createControls from './createControls'
import * as selectors from './getElements'

const { getBoardContainer, getContributionsGrid, getControlsContainer } = selectors

const injectControls = (dom: Document): void => {
  const container = getControlsContainer(dom)
  const controls = createControls(dom)

  if (!container) throw new Error(ERROR_NO_CONTROLS)

  container.prepend(controls)
}

const injectBoard = (dom: Document): void => {
  const container = getBoardContainer(dom)
  const grid = getContributionsGrid(dom)
  
  if (!container || !grid) throw new Error(ERROR_NO_BOARD)
  
  const board = createBoard(dom, grid)

  container.replaceWith(board)
  board.prepend(container)
}

const injectGame = (dom: Document): void => {
  injectControls( dom)
  injectBoard(dom)
}

export default injectGame
