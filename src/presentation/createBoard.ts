import Cell from 'domain/Cell'
import Game from 'domain/Game'
import { create } from 'utils/dom'
import getGridSizes from './getGridSizes'
import {
  setMineButtonListeners,
  setMinesColListeners,
  setMinesGridListeners
} from './setBoardListeners'

const DELAY_MULTIPLIER = 15

let dom: Document
let sizes: ReturnType<typeof getGridSizes>

type OnClick = Parameters<typeof create>[0]['onClick']

const createMineBtnSvg = () => {
  const classes = ['ContributionCalendar-day']
  const { cellWidth } = sizes
  const size = { width: cellWidth, height: cellWidth, rx: '2', ry: '2' }
  const rect = create({ tag: 'rect', classes, 'data-level': '0', ...size }, dom)
  return create({ tag: 'svg', children: [rect], ...size }, dom)
}

const createMinesAroundSpan = (minesAround: number) => {
  const tag = 'span'
  const classes = ['cgm-mines-around']
  const text = `${minesAround}`
  const span = create({ tag, classes, text }, dom) as HTMLElement
  span.style.lineHeight = `${sizes.cellWidth + sizes.cellGap + 1}px`
  span.style.fontSize = `${sizes.cellWidth}px`

  return span
}

const createMineBtn = (cell: Cell, onClick: OnClick) => {
  const tag = 'button'
  const classes = ['cgm-button-mine']
  const children = [createMineBtnSvg()]
  const type = 'button'

  const button = create({ tag, classes, onClick, children, type }, dom) as HTMLElement
  button.style.marginTop = `${sizes.cellGap}px`
  button.style.marginLeft = `${sizes.cellGap}px`

  return setMineButtonListeners(button, cell, createMinesAroundSpan)
}

const createMinesCol = (cells: Cell[], onClick: (y: number) => OnClick): Element => {
  const tag = 'div'
  const classes = ['cgm-mines-col', 'cgm-hidden']
  const children = cells.map((cell: Cell, y: number) => createMineBtn(cell, onClick(y)))

  return create({ tag, classes, children }, dom)
}

const createMinesGrid = (game: Game): Element => {
  const tag = 'div'
  const classes = ['cgm-mines-grid']
  const children = game.cells.map((cells: Cell[], x: number) => {
    const onClick = (y: number) => ({
      primary: () => game.open(x, y),
      secondary: () => game.flag(x, y),
    })

    const col = createMinesCol(cells, onClick)
    return setMinesColListeners(col, game, x * DELAY_MULTIPLIER)
  })

  const minesGrid = create({ tag, classes, children }, dom) as HTMLElement
  minesGrid.style.right = `${sizes.right}px`
  minesGrid.style.bottom = `${sizes.bottom}px`

  return setMinesGridListeners(minesGrid, game)
}

const createContainer = (game: Game): Element => {
  const tag = 'div'
  const classes = ['cgm-board']
  const children = [createMinesGrid(game)]

  return create({ tag, classes, children }, dom)
}

const createBoard = (game: Game, document: Document, grid: Element): Element => {
  dom = document
  sizes = getGridSizes(grid)

  return createContainer(game)
}

export default createBoard
