import Game from 'domain/Game'

const toggleFlag = (x: number, y: number): void => {
  const game = Game.getInstance()
  if (game.status !== 'playing') return
  game.flag(x, y)
}

export default toggleFlag
