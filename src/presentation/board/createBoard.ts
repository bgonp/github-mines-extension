import { COLS, ROWS } from 'constants/game'
import { onSizesChange } from 'presentation/common/sizesListeners'
import { openCell, toggleFlag } from 'use-cases'
import { create } from 'utils/dom'

import {
  setMineButtonListeners,
  setMinesColListeners,
  setMinesGridListeners
} from './setBoardListeners'

const DELAY_MULTIPLIER = 15

const createMineBtnSvg = (): Element => {
  const classes = ['ContributionCalendar-day']
  const rect = create('rect', { classes, 'data-level': '0', rx: '2', ry: '2' })
  const svg = create('svg', { children: [rect] })

  onSizesChange(({ cellWidth }) => {
    rect.setAttribute('width', `${cellWidth}`)
    rect.setAttribute('height', `${cellWidth}`)
    svg.setAttribute('width', `${cellWidth}`)
    svg.setAttribute('height', `${cellWidth}`)
  })

  return svg
}

const createMinesAroundSpan = (minesAround: number): Element => {
  const classes = ['cgm-mines-around']
  const text = `${minesAround}`
  const span = create('span', { classes, text }) as HTMLElement

  onSizesChange(({ cellGap, cellWidth }) => {
    span.style.lineHeight = `${cellWidth + cellGap + 1}px`
    span.style.fontSize = `${cellWidth}px`
  })

  return span
}

const createMineBtn = (x: number, y: number): Element => {
  const classes = ['cgm-button-mine']
  const children = [createMineBtnSvg()]
  const type = 'button'
  const onClick = {
    primary: () => openCell(x, y),
    secondary: () => toggleFlag(x, y),
  }

  const button = create('button', { classes, onClick, children, type }) as HTMLElement
  setMineButtonListeners(button, x, y, createMinesAroundSpan)

  onSizesChange(({ cellGap }) => {
    button.style.marginTop = `${cellGap}px`
    button.style.marginLeft = `${cellGap}px`
  })

  return button
}

const createMinesCol = (x: number): Element => {
  const classes = ['cgm-mines-col', 'cgm-hidden']
  const children = [...Array(ROWS).keys()].map((y) => createMineBtn(x, y))

  return create('div',{ classes, children })
}

const createMinesGrid = (): Element => {
  const classes = ['cgm-mines-grid']
  const children = [...Array(COLS).keys()].map((x) => {
    const col = createMinesCol(x)
    setMinesColListeners(col, x * DELAY_MULTIPLIER)

    return col
  })

  const minesGrid = create('div', { classes, children }) as HTMLElement
  setMinesGridListeners(minesGrid)

  onSizesChange(({ right, bottom }) => {
    minesGrid.style.right = `${right}px`
    minesGrid.style.bottom = `${bottom}px`
  })

  return minesGrid
}

const createBoard = (): Element => {
  const classes = ['cgm-board']
  const children = [createMinesGrid()]

  return create('div', { classes, children })
}

export default createBoard
