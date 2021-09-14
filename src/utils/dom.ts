export const $ = (selector: string): HTMLElement =>
  document.querySelector<HTMLElement>(selector)

export const $$ = (selector: string): NodeListOf<HTMLElement> =>
  document.querySelectorAll(selector)

type Props = {
  classes?: string[]
  children?: HTMLElement[]
  text?: string
}

export const create = (tag: string, {classes, children, text}: Props): HTMLElement => {
  const element = document.createElement(tag)

  if (text) element.innerText = text
  if (children) children.forEach(child => element.appendChild(child))
  if (classes) classes.forEach(className => element.classList.add(className))

  return element
}