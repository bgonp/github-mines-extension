import Game from 'domain/Game'

const destroy = (): void => {
  const game = Game.getInstance()
  if (game.status === 'destroyed') return
  game.destroy()
}

export default destroy
