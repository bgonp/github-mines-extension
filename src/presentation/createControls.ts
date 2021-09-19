import { destroy, setMines, startGame } from 'application'
import { MINES } from 'constants/game'
import {
  DESTROY_BTN, DESTROY_MSG, LOSE_MSG, MINES_LBL, PLAY_BTN, PLAY_MSG, WIN_MSG
} from 'constants/literals'
import { create } from 'utils/dom'
import {
  setContainerListeners,
  setLabelButtonListeners,
  setMinesButtonListeners,
  setPlayButtonListeners,
  setStatusSpanListeners
} from './setControlsListeners'

let dom: Document

const createLabelButton = () => {
  const tag = 'button'
  const classes = ['btn', 'btn-sm', 'BtnGroup-item']
  const text = MINES_LBL

  const button = create({ tag, classes, text }, dom)

  return setLabelButtonListeners(button)
}

const createMinesButtons = (): Element[] => {
  const tag = 'button'
  const classes = ['cgm-button-mines', 'btn', 'btn-sm', 'BtnGroup-item']
  const type = 'button'

  const createButton = (mines: number) => {
    const text = `${mines}`
    const onClick = { primary: () => setMines(mines) }
  
    const button = create({ tag, classes, text, type, onClick }, dom)

    return setMinesButtonListeners(button, mines)
  }

  return MINES.map((mines) => createButton(mines))
}

const createPlayButton = (): Element => {
  const tag = 'button'
  const classes = ['btn', 'btn-sm', 'btn-primary', 'ml-1', 'tooltipped', 'tooltipped-sw']
  const text = PLAY_BTN
  const onClick = { primary: startGame }
  const tooltip = PLAY_MSG
  const disabled = 'disabled'

  const button = create({
    tag, classes, text, onClick, 'aria-label': tooltip, disabled
  }, dom)

  return setPlayButtonListeners(button)
}

const createDestroyButton = (): Element => {
  const tag = 'button'
  const classes = ['btn', 'btn-sm', 'btn-danger', 'ml-1']
  const text = DESTROY_BTN
  const message = DESTROY_MSG
  const onClick = { primary: () => { if (confirm(message)) destroy() } }

  return create({ tag, classes, text, onClick }, dom)
}

const createStatusSpan = (): Element => {
  const tag = 'span'
  const classes = ['f4', 'mr-3']

  const span = create({ tag, classes, text: '' }, dom)

  return setStatusSpanListeners(span, WIN_MSG, LOSE_MSG)
}

const createContainer = (): Element => {
  const tag = 'div'
  const buttonsClasses = ['BtnGroup']
  const controlsClasses = ['cgm-controls', 'mb-2']

  const label = createLabelButton()
  const minesButtons = createMinesButtons()
  const playButton = createPlayButton()
  const closeButton = createDestroyButton()
  const statusNotice = createStatusSpan()

  const buttons = create({
    tag,
    classes: buttonsClasses,
    children: [label, ...minesButtons]
  }, dom)

  const controls = create({
    tag,
    classes: controlsClasses,
    children: [statusNotice, buttons, playButton, closeButton]
  }, dom)

  return setContainerListeners(controls)
}

const createControls = (document: Document): Element => {
  dom = document

  return createContainer()
}

export default createControls
