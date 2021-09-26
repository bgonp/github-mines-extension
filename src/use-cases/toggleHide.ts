import Game from 'domain/Game'

const toggleHide = (): void => {
  const game = Game.getInstance()
  game.hidden = !game.hidden
}

export default toggleHide
