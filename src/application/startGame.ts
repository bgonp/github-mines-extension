import Game from 'domain/Game'

const startGame = (): void => {
  const game = Game.getInstance()
  if (game.status === 'playing' || game.mines === 0) return
  game.start()
}

export default startGame
