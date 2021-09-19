const SVG_XMLNS = 'http://www.w3.org/2000/svg'
const SVG_TAGS = ['svg', 'path', 'rect', 'text', 'g']

type Props = {
  tag: string,
  classes?: string[]
  children?: Element[]
  text?: string
  onClick?: { primary?: () => void, secondary?: () => void }
  [key: string]: unknown // TODO: rest props should be string
}

const isSVGTag = (tag: string): boolean => SVG_TAGS.includes(tag)

const defaultPrevented = (callback: () => void) => (e: Event) => {
  e.preventDefault()
  callback()
}

export function create(props: Props, dom: Document): Element {
  const { tag, classes, children, text, onClick, ...rest } = props
  const element: Element = isSVGTag(tag)
    ? dom.createElementNS(SVG_XMLNS, tag)
    : dom.createElement(tag)
  
  if (text) element.textContent = text
  if (children) children.forEach(child => element.appendChild(child))
  if (classes) classes.forEach(className => element.classList.add(className))
  if (onClick?.primary)
    element.addEventListener('click', defaultPrevented(onClick.primary))
  if (onClick?.secondary)
    element.addEventListener('contextmenu', defaultPrevented(onClick.secondary))
  Object.entries(rest).forEach(([key, value]) =>
    element.setAttribute(key, value as string)
  )
  
  return element
}

export const $ = (
  selector: string,
  parent: Document | Element
): Element | null =>
  parent.querySelector(selector)

export const $$ = (
  selector: string,
  parent: Document | Element
): Element[] => 
  Array.from(parent.querySelectorAll(selector))