import { openCell, toggleFlag } from 'application'
import { COLS, ROWS } from 'constants/game'
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

const createMineBtn = (x: number, y: number) => {
  const tag = 'button'
  const classes = ['cgm-button-mine']
  const children = [createMineBtnSvg()]
  const type = 'button'
  const onClick = {
    primary: () => openCell(x, y),
    secondary: () => toggleFlag(x, y),
  }

  const button = create({ tag, classes, onClick, children, type }, dom) as HTMLElement
  button.style.marginTop = `${sizes.cellGap}px`
  button.style.marginLeft = `${sizes.cellGap}px`

  return setMineButtonListeners(button, x, y, createMinesAroundSpan)
}

const createMinesCol = (x: number): Element => {
  const tag = 'div'
  const classes = ['cgm-mines-col', 'cgm-hidden']
  const children = [...Array(ROWS).keys()].map((y) => createMineBtn(x, y))

  return create({ tag, classes, children }, dom)
}

const createMinesGrid = (): Element => {
  const tag = 'div'
  const classes = ['cgm-mines-grid']
  const children = [...Array(COLS).keys()].map((x) => {
    const col = createMinesCol(x)
    return setMinesColListeners(col, x * DELAY_MULTIPLIER)
  })

  const minesGrid = create({ tag, classes, children }, dom) as HTMLElement
  minesGrid.style.right = `${sizes.right}px`
  minesGrid.style.bottom = `${sizes.bottom}px`

  return setMinesGridListeners(minesGrid)
}

const createContainer = (): Element => {
  const tag = 'div'
  const classes = ['cgm-board']
  const children = [createMinesGrid()]

  return create({ tag, classes, children }, dom)
}

const createBoard = (document: Document, grid: Element): Element => {
  dom = document
  sizes = getGridSizes(grid)

  return createContainer()
}

export default createBoard
