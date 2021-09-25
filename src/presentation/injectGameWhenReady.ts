import createBoard from './board/createBoard'
import createControls from './controls/createControls'

import {
  getBoardContainer,
  getContributionsGrid,
  getControlsContainer,
  getObservableContainer,
} from './common/getElements'
import getGridSizes from './common/getGridSizes'
import { setSizes } from './common/sizesListeners'

const onContainerChange = (container: Element, callback: () => void): void => {
  const config = { childList: true, subtree: true }
  const observer = new MutationObserver(() => callback())
  observer.observe(container, config)
}

const injectGameWhenReady = (): void => {
  const controls = createControls()
  const board = createBoard()
  const observable = getObservableContainer()

  const injectGame = () => {
    if (observable?.contains(controls)) return

    const controlsContainer = getControlsContainer()
    const boardContainer = getBoardContainer()
    const grid = getContributionsGrid()
  
    if (!controlsContainer || !boardContainer || !grid) return

    getBoardContainer(board)?.remove()
    setSizes(getGridSizes(grid))

    controlsContainer.prepend(controls)
    boardContainer.replaceWith(board)
    board.prepend(boardContainer)
  }

  if (observable) onContainerChange(observable, injectGame)
  injectGame()
}

export default injectGameWhenReady
