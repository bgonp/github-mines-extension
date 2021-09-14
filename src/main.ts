import getContainer from './getConatiner'
import injectGame from './injectGame'
import isProfilePage from './utils/isProfilePage'

(() => {
  if (!isProfilePage()) return
  const container = getContainer()
  injectGame(container)
})()
