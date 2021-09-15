import { $ } from '../utils/dom'

const CONTROLS_SELECTOR = 'body.page-profile .graph-before-activity-overview .js-calendar-graph'

const BOARD_SELECTOR = 'body.page-profile .graph-before-activity-overview'
// const BOARD_SELECTOR = 'body.page-profile .graph-before-activity-overview .js-calendar-graph-svg > g'

export const getControlsContainer = (): HTMLElement => $(CONTROLS_SELECTOR)

export const getBoardContainer = (): HTMLElement => $(BOARD_SELECTOR)