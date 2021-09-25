const baseSizes = { bottom: 0, right: 0, cellWidth: 0, cellGap: 0 }

let onSizesChange: (callback: () => void) => void
let setSizes: (sizes: typeof baseSizes) => void

describe('presentation/common/sizesListeners', () => {
  beforeEach(() => {
    const sizesListeners = require('presentation/common/sizesListeners')
    onSizesChange = sizesListeners.onSizesChange
    setSizes = sizesListeners.setSizes
  })

  afterEach(() => {
    jest.resetModules()
  })

  it('should run callback on sizes change', () => {
    const callback = jest.fn()

    onSizesChange(callback)
    expect(callback).not.toHaveBeenCalled()
    setSizes({ ...baseSizes })
    expect(callback).toHaveBeenCalledWith({ ...baseSizes })
  })

  it('should run callback if sizes has been set', () => {
    const callback = jest.fn()

    setSizes({ ...baseSizes })
    onSizesChange(callback)
    expect(callback).toHaveBeenCalledWith({ ...baseSizes })
  })

  it('should run callback on every sizes change', () => {
    const callback = jest.fn()
    
    onSizesChange(callback)
    setSizes({ ...baseSizes })
    setSizes({ ...baseSizes })
    setSizes({ ...baseSizes })
    expect(callback).toHaveBeenCalledTimes(3)
  })

  it('should run callback with new sizes value', () => {
    const callback = jest.fn()

    onSizesChange(callback)
    setSizes({ ...baseSizes, cellWidth: 3, cellGap: 4 })
    expect(callback).toHaveBeenCalledWith({ ...baseSizes, cellWidth: 3, cellGap: 4 })
    setSizes({ ...baseSizes, bottom: 1, right: 2 })
    expect(callback).toHaveBeenCalledWith({ ...baseSizes, bottom: 1, right: 2 })
  })
})