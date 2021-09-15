import Game from '../game/Game'
import { create } from '../utils/dom'

const MINES = [15, 25, 40]

const getLabel = (game: Game) => {
  const classes = ['btn', 'btn-sm', 'BtnGroup-item']
  const text = 'Mines:'

  const label = create('button', { classes, text })
  const onGameChange = (playing: boolean) => label.setAttribute('disabled', playing ? 'true' : 'false')
  game.subscribe('playing', onGameChange)

  return label
}

const getMinesButtons = (game: Game): HTMLElement[] => {
  const classes = ['btn', 'btn-sm', 'BtnGroup-item']

  const getButton = (mines: number) => {
    const onclick = () => game.mines = mines
    const text = `${mines}`
    
    const button = create('button', { classes, text, onclick })

    const onMinesChange = (newMines: number) => button.setAttribute('aria-selected', newMines === mines ? 'true' : 'false')
    const onGameChange = (playing: boolean) => button.setAttribute('disabled', playing ? 'true' : 'false')
    game.subscribe('mines', onMinesChange)
    game.subscribe('playing', onGameChange)

    return button
  }

  return MINES.map((mines) => getButton(mines))
}

const getPlayButton = (game: Game): HTMLElement => {
  const classes = ['btn', 'btn-sm', 'btn-primary']
  const onclick = () => game.start()
  const text = 'Play'

  const button = create('button', { classes, text, onclick })

  const onGameChange = (playing: boolean) => button.setAttribute('disabled', playing ? 'true' : 'false')
  game.subscribe('playing', onGameChange)

  return button
}

const getControls = (game: Game): HTMLElement => {
  const buttonsClasses = ['BtnGroup']
  const controlsClasses = ['mb-2']

  const label = getLabel(game)
  const minesButtons = getMinesButtons(game)
  const playButton = getPlayButton(game)

  const buttons = create('div', { classes: buttonsClasses, children: [label, ...minesButtons] })
  const controls = create('div', { classes: controlsClasses, children: [buttons, playButton] })

  return controls
}

export default getControls
