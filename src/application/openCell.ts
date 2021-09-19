import Game from 'domain/Game'

const openCell = (x: number, y: number): void => {
  const game = Game.getInstance()
  if (game.status !== 'playing') return
  game.open(x, y)
}

export default openCell
