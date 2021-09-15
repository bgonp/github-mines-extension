import Game from '../game/Game'
import getBoard from './getBoard'
import getControls from './getControls'
import { getBoardContainer, getControlsContainer } from './getContainers'
import Board from '../game/Board'

const injectControls = (game: Game): void => {
  const container = getControlsContainer()
  const controls = getControls(game)

  container.prepend(controls)
}

const injectBoard = (gameBoard: Board): void => {
  const container = getBoardContainer()
  const board = getBoard(gameBoard)

  container.append(board)
}

const injectGame = (game: Game): void => {
  injectControls(game)
  injectBoard(game.board)
}

export default injectGame
