import injectGame from './presentation/injectGame'
import isProfilePage from 'utils/isProfilePage'

import './style.css'

;((win, dom) => {
  const { pathname } = win.location
  if (!isProfilePage(pathname)) return
  injectGame(dom)
})(window, document)
