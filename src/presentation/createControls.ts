import { MINES } from 'constants/game'
import {
  DESTROY_BTN, DESTROY_MSG, LOSE_MSG, MINES_LBL, PLAY_BTN, PLAY_MSG, WIN_MSG
} from 'constants/literals'
import Game from 'domain/Game'
import { create } from 'utils/dom'
import {
  setContainerListeners,
  setLabelButtonListeners,
  setMinesButtonListeners,
  setPlayButtonListeners,
  setStatusSpanListeners
} from './setControlsListeners'

let dom: Document

const createLabelButton = (game: Game) => {
  const tag = 'button'
  const classes = ['btn', 'btn-sm', 'BtnGroup-item']
  const text = MINES_LBL

  const button = create({ tag, classes, text }, dom)

  return setLabelButtonListeners(button, game)
}

const createMinesButtons = (game: Game): Element[] => {
  const tag = 'button'
  const classes = ['cgm-button-mines', 'btn', 'btn-sm', 'BtnGroup-item']
  const type = 'button'

  const createButton = (mines: number) => {
    const text = `${mines}`
    const onClick = { primary: () => game.mines = mines }
  
    const button = create({ tag, classes, text, type, onClick }, dom)

    return setMinesButtonListeners(button, game, mines)
  }

  return MINES.map((mines) => createButton(mines))
}

const createPlayButton = (game: Game): Element => {
  const tag = 'button'
  const classes = ['btn', 'btn-sm', 'btn-primary', 'ml-1', 'tooltipped', 'tooltipped-sw']
  const text = PLAY_BTN
  const onClick = { primary: () => game.start() }
  const tooltip = PLAY_MSG

  const button = create({ tag, classes, text, onClick, 'aria-label': tooltip }, dom)

  return setPlayButtonListeners(button, game)
}

const createDestroyButton = (game: Game): Element => {
  const tag = 'button'
  const classes = ['btn', 'btn-sm', 'btn-danger', 'ml-1']
  const text = DESTROY_BTN
  const message = DESTROY_MSG
  const onClick = { primary: () => confirm(message) && game.destroy() }

  return create({ tag, classes, text, onClick }, dom)
}

const createStatusSpan = (game: Game): Element => {
  const tag = 'span'
  const classes = ['f4', 'mr-3']

  const span = create({ tag, classes, text: '' }, dom)

  return setStatusSpanListeners(span, game, { win: WIN_MSG, lose: LOSE_MSG })
}

const createContainer = (game: Game): Element => {
  const tag = 'div'
  const buttonsClasses = ['BtnGroup']
  const controlsClasses = ['cgm-controls', 'mb-2']

  const label = createLabelButton(game)
  const minesButtons = createMinesButtons(game)
  const playButton = createPlayButton(game)
  const closeButton = createDestroyButton(game)
  const statusNotice = createStatusSpan(game)

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

  return setContainerListeners(controls, game)
}

const createControls = (game: Game, document: Document): Element => {
  dom = document

  return createContainer(game)
}

export default createControls
