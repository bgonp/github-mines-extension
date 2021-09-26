import Game from 'domain/Game'

const setMines = (mines: number): void => {
  const game = Game.getInstance()
  if (game.status === 'playing') return
  game.mines = mines
}

export default setMines
