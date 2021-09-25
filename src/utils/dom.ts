const SVG_XMLNS = 'http://www.w3.org/2000/svg'
const SVG_TAGS = ['svg', 'path', 'rect', 'text', 'g']

type Attributes = {
  children?: Element[]
  classes?: string[]
  text?: string
  onClick?: { primary?: () => void, secondary?: () => void }
  [key: string]: unknown // TODO: rest props should be string
}

const isSVGTag = (tag: string): boolean => SVG_TAGS.includes(tag)

const defaultPrevented = (callback: () => void) => (e: Event) => {
  e.preventDefault()
  callback()
}

export function create(tag: string, attr: Attributes = {}): Element {
  const { classes, children, text, onClick, ...rest } = attr
  const element: Element = isSVGTag(tag)
    ? document.createElementNS(SVG_XMLNS, tag)
    : document.createElement(tag)
  
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
  parent: Document | Element = document
): Element | null =>
  parent.querySelector(selector)

export const $$ = (
  selector: string,
  parent: Document | Element = document
): Element[] => 
  Array.from(parent.querySelectorAll(selector))
