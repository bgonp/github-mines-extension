import { ERROR_NO_GRID } from 'constants/literals'

type Sizes = {
  bottom: number
  right: number
  cellWidth: number
  cellGap: number
}

type Position = {
  top: number
  right: number
  bottom: number
  left: number
}

const getTranslateValues = (item: Element): number[] => {
  const values = item.getAttribute('transform')?.match(/\d+/g)
  if (!values) throw new Error(ERROR_NO_GRID)
  return values.map(value => parseInt(value))
}

const getRelativePosition = (item: Element, container: Element): Position => {
  const itemRect = item.getBoundingClientRect()
  const containerRect = container.getBoundingClientRect()
  return {
    top: Math.round(containerRect.top - itemRect.top),
    right: Math.round(containerRect.right - itemRect.right),
    bottom: Math.round(containerRect.bottom - itemRect.bottom),
    left: Math.round(containerRect.left - itemRect.left),
  }
}

const getGridSizes = (grid: Element): Sizes => {
  if (grid.children.length < 2 || !grid.parentElement) throw new Error(ERROR_NO_GRID)

  const { bottom, right } = getRelativePosition(grid, grid.parentElement)
  const { width: cellWidth } = grid.children[0].getBoundingClientRect()
  const horizontalTranslate = getTranslateValues(grid.children[1])[0]
  const cellGap = horizontalTranslate - cellWidth - 1
  
  return { bottom, right, cellWidth, cellGap }
}

export default getGridSizes
