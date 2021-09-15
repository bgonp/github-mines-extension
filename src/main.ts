import Game from './game/Game'
import injectGame from './inject/injectGame'
import isProfilePage from './utils/isProfilePage'

import './css/style.css'

(() => {
  if (!isProfilePage()) return
  const game = new Game()
  injectGame(game)
})()
