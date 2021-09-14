import { $ } from './utils/dom'

const CONTAINER_SELECTOR =
  'body.page-profile .js-yearly-contributions .graph-before-activity-overview'

const getContainer = (): HTMLElement => $(CONTAINER_SELECTOR)

export default getContainer
