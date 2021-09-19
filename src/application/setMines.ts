import Game from 'domain/Game'

const setMines = (mines: number): void => {
  const game = Game.getInstance()
  if (['playing', 'destroyed'].includes(game.status)) return
  game.mines = mines
}

export default setMines
