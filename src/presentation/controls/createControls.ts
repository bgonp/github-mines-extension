import { setMines, startGame, toggleHide } from 'application'
import { MINES } from 'constants/game'
import { EYE_CLOSED_PATH, EYE_OPENED_PATH } from 'constants/icons'
import {
  HIDDEN_MSG, LOSE_MSG, MINES_BTN, PLAY_BTN, PLAY_MSG, WIN_MSG
} from 'constants/literals'
import { create } from 'utils/dom'

import {
  setHideButtonListeners,
  setLabelButtonListeners,
  setMinesButtonListeners,
  setPlayButtonListeners,
  setStatusSpanListeners
} from './setControlsListeners'

const createStatusSpan = (): Element => {
  const classes = ['f4', 'mr-3']

  const span = create('span', { classes, text: '' })
  setStatusSpanListeners(span, WIN_MSG, LOSE_MSG, HIDDEN_MSG)

  return span
}

const createLabelButton = (): Element => {
  const classes = ['btn', 'btn-sm', 'BtnGroup-item']
  const text = MINES_BTN

  const button = create('button', { classes, text })
  setLabelButtonListeners(button)

  return button
}

const createMinesButtons = (): Element[] => {
  const classes = ['cgm-button-mines', 'btn', 'btn-sm', 'BtnGroup-item']
  const type = 'button'

  const createButton = (mines: number) => {
    const text = `${mines}`
    const onClick = { primary: () => setMines(mines) }
  
    const button = create('button', { classes, text, type, onClick })
    setMinesButtonListeners(button, mines)

    return button
  }

  return MINES.map((mines) => createButton(mines))
}

const createPlayButton = (): Element => {
  const classes = ['btn', 'btn-sm', 'btn-primary', 'ml-1', 'tooltipped', 'tooltipped-sw']
  const text = PLAY_BTN
  const tooltip = PLAY_MSG
  const onClick = { primary: startGame }
  const disabled = 'disabled'
  const attr = { classes, text, onClick, 'aria-label': tooltip, disabled }

  const button = create('button', attr)
  setPlayButtonListeners(button)

  return button
}

const createClosedEyeSvg = (): Element => {
  const classes = ['octicon']
  const path = create('path', { 'fill-rule': 'evenodd', d: EYE_CLOSED_PATH })
  return create('svg', { classes, children: [path], height: '16', width: '16' })
}

const createOpenedEyeSvg = (): Element => {
  const classes = ['octicon']
  const path = create('path', { 'fill-rule': 'evenodd', d: EYE_OPENED_PATH })
  return create('svg', { classes, children: [path], height: '16', width: '16' })
}

const createHideButton = (): Element => {
  const classes = ['btn', 'btn-sm', 'ml-1']
  const hideIcon = createClosedEyeSvg()
  const showIcon = createOpenedEyeSvg()
  const onClick = { primary: () => toggleHide() }
  const disabled = 'disabled'

  const button = create('button', { classes, children: [hideIcon], onClick, disabled })
  setHideButtonListeners(button, showIcon, hideIcon)

  return button
}

const createControls = (): Element => {
  const buttonsClasses = ['BtnGroup']
  const controlsClasses = ['cgm-controls', 'mb-2']

  const statusNotice = createStatusSpan()
  const label = createLabelButton()
  const minesButtons = createMinesButtons()
  const playButton = createPlayButton()
  const hideButton = createHideButton()

  const buttonsChildren = [label, ...minesButtons]
  const buttons = create('div', { classes: buttonsClasses, children: buttonsChildren })

  const controlsChildren = [statusNotice, buttons, playButton, hideButton]
  const controls = create('div', { classes: controlsClasses, children: controlsChildren })

  return controls
}

export default createControls
