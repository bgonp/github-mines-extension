import Board from '../game/Board'
import Cell from '../game/Cell'
import { create } from '../utils/dom'

const LEFT_CLICK = 0
const RIGHT_CLICK = 2

const getMineButtonSvg = () => { // TODO
  const rect = create('rect', { width: '10', height: '10', classes: ['ContributionCalendar-day'], rx: '2', ry: '2', 'data-level': '0' })
  return create('svg', { width: '10', height: '10', classes: ['d-inline-block'], children: [rect], viewBox: '0 0 10 10' })
}

const getMineButton = (cell: Cell): HTMLElement => {
  const classes = ['cgm-button-mine']
  const onclick = ({ button }: MouseEvent) => {
    if (button === LEFT_CLICK) cell.isOpen = true
    else if (button === RIGHT_CLICK) cell.hasFlag = !cell.hasFlag
  }
  const button = create('button', { classes, onclick, children: [getMineButtonSvg()] })

  let minesAround = 0
  let hasMine = false
  let hasFlag = false

  const onMinesAroundChange = (newMinesAround: number) => minesAround = newMinesAround
  const onHasMineChange = (newHasMine: boolean) => hasMine = newHasMine
  const onHasFlagChange = (newHasFlag: boolean) => hasFlag = newHasFlag
  const onIsOpenChange = (isOpen: boolean) => {
    if (!isOpen) button.innerText = ''
    if (hasMine) button.innerText = '*'
    if (hasFlag) button.innerText = '!'
    button.innerText = `${minesAround}`
  }

  cell.subscribe('minesAround', onMinesAroundChange)
  cell.subscribe('hasMine', onHasMineChange)
  cell.subscribe('hasFlag', onHasFlagChange)
  cell.subscribe('isOpen', onIsOpenChange)

  return button
}

const getMinesCol = (cells: Cell[]): HTMLElement => {
  const classes = ['cgm-mines-col']
  const minesButtons = cells.map((cell: Cell) => getMineButton(cell))

  return create('div', { classes, children: minesButtons })
}

const getBoard = (board: Board): HTMLElement => {
  const classes = ['cgm-mines-grid']
  const minesBoard = board.cells.map((cells: Cell[]) => getMinesCol(cells))

  return create('div', { classes, children: minesBoard })
}

export default getBoard
