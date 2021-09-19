import Game from 'domain/Game'

const startGame = (): void => {
  const game = Game.getInstance()
  if (['playing', 'destroyed'].includes(game.status) || game.mines === 0) return
  game.start()
}

export default startGame
