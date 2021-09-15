export const $ = (selector: string): HTMLElement =>
  document.querySelector<HTMLElement>(selector)

export const $$ = (selector: string): NodeListOf<HTMLElement> =>
  document.querySelectorAll(selector)

type Props = {
  classes?: string[]
  children?: HTMLElement[]
  text?: string
  onclick?: (event: MouseEvent) => void
  [key: string]: unknown
}

export const create = (tag: string, props: Props): HTMLElement => {
  const { classes, children, text, onclick, ...rest } = props
  const element = document.createElement(tag)

  if (text) element.innerText = text
  if (children) children.forEach(child => element.appendChild(child))
  if (classes) classes.forEach(className => element.classList.add(className))
  if (onclick) element.addEventListener('click', onclick)
  Object.entries(rest).forEach(([key, value]) => element.setAttribute(key, value as string))

  return element
}