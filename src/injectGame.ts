import { create } from './utils/dom'

const injectGame = (container: HTMLElement): void => {
  const button15 = create('button', { classes: ['btn', 'BtnGroup-item'], text: '10' })
  const button25 = create('button', { classes: ['btn', 'BtnGroup-item'], text: '25' })
  const button40 = create('button', { classes: ['btn', 'BtnGroup-item'], text: '40' })
  const buttons = create('div', { classes: ['BtnGroup'], children: [button15, button25, button40] })

  container.prepend(buttons)
}

export default injectGame
