import { create, $, $$ } from 'utils/dom'

describe('utils/dom create', () => {
  it('should create an html element correctly', () => {
    const onclick = jest.fn()
    const props = {
      classes: ['c1', 'c2'],
      foo: 'bar',
      onClick: { primary: onclick },
      text: 'lorem ipsum'
    }
    const element = create('div', props) as HTMLElement
    
    expect(element).toBeInstanceOf(HTMLElement)
    expect(element.tagName).toBe('DIV')
    expect(element.textContent).toBe('lorem ipsum')
    expect(element.children).toHaveLength(0)
    expect(element.classList).toHaveLength(2)
    expect(element.classList.contains('c1')).toBe(true)
    expect(element.classList.contains('c2')).toBe(true)
    expect(element.getAttribute('foo')).toBe('bar')
    expect(onclick).not.toHaveBeenCalled()
    element.click()
    expect(onclick).toHaveBeenCalled()
  })

  it('should create an svg element correctly', () => {
    const oncontextmenu = jest.fn()
    const props = {
      children: [create('div'), create('div')],
      onClick: { secondary: oncontextmenu },
    }
    const element = create('svg', props)
    
    expect(element).toBeInstanceOf(SVGElement)
    expect(element.tagName).toBe('svg')
    expect(element.children).toHaveLength(2)
    expect(element.classList).toHaveLength(0)
    expect(oncontextmenu).not.toHaveBeenCalled()
    element.dispatchEvent(new Event('contextmenu'))
    expect(oncontextmenu).toHaveBeenCalled()
  })
})

describe('utils/dom $', () => {
  it('should return element if exists in document', () => {
    document.body.innerHTML =
      '<html><body><div class="c1"></div></body></html>'
    const isInDocument = $('.c1')
    const isNotInDocument = $('.c2')

    expect(isInDocument).toBeInstanceOf(Element)
    expect(isNotInDocument).toBeNull()
  })

  it('should return element if exists in parent', () => {
    document.body.innerHTML = `
      <html><body>
        <div class="c1"><div class="c1-1"></div></div>
        <div class="c2"></div>
      </body></html>`
    const parent1 = $('.c1')
    const parent2 = $('.c2')
    const child1 = $('.c1-1', parent1 as Element)
    const child2 = $('.c1-1', parent2 as Element)

    expect(child1).toBeInstanceOf(Element)
    expect(child2).toBeNull()
  })
})

describe('utils/dom $$', () => {
  it('should return empty array if element doesn\'t exists', () => {
    document.body.innerHTML = `
      <html><body>
        <div class="c1"></div>
      </body></html>`
    const elements = $$('.c2')

    expect(Array.isArray(elements)).toBe(true)
    expect(elements).toHaveLength(0)
  })

  it('should return element if exists in parent', () => {
    document.body.innerHTML = `
      <html><body>
        <div class="c1"></div>
        <div class="c1"></div>
      </body></html>`
    const elements = $$('.c1')

    expect(elements).toHaveLength(2)
  })
})
