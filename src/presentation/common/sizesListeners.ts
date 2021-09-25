import getGridSizes from './getGridSizes'

type Sizes = ReturnType<typeof getGridSizes>

const sizesListeners = [] as ((sizes: Sizes) => void)[]
let sizes: Sizes | null = null

export const onSizesChange = (callback: (sizes: Sizes) => void): void => {
  if (sizes) callback(sizes)
  sizesListeners.push(callback)
}

export const setSizes = (newSizes: Sizes): void => {
  sizes = newSizes
  sizesListeners.forEach((listener) => listener(newSizes))
}
