import Cell from 'domain/Cell'

let cell: Cell

const OBSERVABLE_PROPS: [keyof Cell, boolean | number][] = [
  ['hasMine', true],
  ['hasFlag', true],
  ['isOpen', true],
  ['minesAround', 2],
]

describe('domain/Cell', () => {
  beforeEach(() => cell = new Cell())

  it('should be built with default values', () => {
    expect(cell.hasMine).toBe(false)
    expect(cell.hasFlag).toBe(false)
    expect(cell.isOpen).toBe(false)
    expect(cell.minesAround).toBe(0)
  })
  
  it('should change properties correctly', () => {
    cell.hasMine = true
    cell.hasFlag = true
    cell.minesAround = 3
  
    expect(cell.hasMine).toBe(true)
    expect(cell.hasFlag).toBe(true)
    expect(cell.isOpen).toBe(false)
    expect(cell.minesAround).toBe(3)
  })
  
  it.each(OBSERVABLE_PROPS)(
    'should notify observers when properties changes: %p',
    <T extends keyof Cell>(key: T, value: Cell[T]) => {
      const observer = jest.fn()
      cell.subscribe(key, observer)
      cell[key] = value
      expect(observer).toHaveBeenCalledWith(value)
    }
  )

  it('should reset cell to default values', () => {
    cell.hasMine = true
    cell.hasFlag = true
    cell.isOpen = true
    cell.minesAround = 3
    cell.reset()
  
    expect(cell.hasMine).toBe(false)
    expect(cell.hasFlag).toBe(false)
    expect(cell.isOpen).toBe(false)
    expect(cell.minesAround).toBe(0)
  })
})