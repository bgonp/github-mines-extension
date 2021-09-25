import { $ } from 'utils/dom'

const CONTROLS_SELECTOR = '.js-calendar-graph'
const BOARD_SELECTOR = '.js-calendar-graph-svg'
const GRID_SELECTOR = '.js-calendar-graph-svg > g'
const OBSERVABLE_CONTAINER_SELECTOR = '#js-pjax-container'

type ParentType = Document | Element

export const getControlsContainer = (parent: ParentType = document): Element | null =>
  $(CONTROLS_SELECTOR, parent)

export const getBoardContainer = (parent: ParentType = document): Element | null =>
  $(BOARD_SELECTOR, parent)

export const getContributionsGrid = (parent: ParentType = document): Element | null =>
  $(GRID_SELECTOR, parent)

export const getObservableContainer = (parent: ParentType = document): Element | null =>
  $(OBSERVABLE_CONTAINER_SELECTOR, parent)
