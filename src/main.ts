import Game from './domain/Game'
import injectGame from './presentation/injectGame'
import isProfilePage from 'utils/isProfilePage'

import './style.css'

;((win, dom) => {
  const { pathname } = win.location
  if (!isProfilePage(pathname)) return

  const game = new Game()
  injectGame(game, dom)
})(window, document)
