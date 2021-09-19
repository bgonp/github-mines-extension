import { $ } from 'utils/dom'

const CONTROLS_SELECTOR =
  'body.page-profile .graph-before-activity-overview .js-calendar-graph'

const BOARD_SELECTOR =
  'body.page-profile .graph-before-activity-overview .js-calendar-graph-svg'

const GRID_SELECTOR =
  'body.page-profile .graph-before-activity-overview .js-calendar-graph-svg > g'

export const getControlsContainer = (dom: Document): Element | null =>
  $(CONTROLS_SELECTOR, dom)

export const getBoardContainer = (dom: Document): Element | null =>
  $(BOARD_SELECTOR, dom)

export const getContributionsGrid = (dom: Document): Element | null =>
  $(GRID_SELECTOR, dom)
