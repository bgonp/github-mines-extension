import injectGameWhenReady from 'presentation/injectGameWhenReady'
import isProfilePage from 'utils/isProfilePage'

import './style.css'

if (isProfilePage()) injectGameWhenReady()
