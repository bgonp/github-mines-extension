import Cell from 'domain/Cell'
import Game from 'domain/Game'

export const subscribeGame = <T extends keyof Game>(
  prop: T,
  callback: (value: Game[T]) => void
): void => {
  const game = Game.getInstance()
  game.subscribe(prop, callback)
}

export const unsubscribeGame = <T extends keyof Game>(
  prop: T,
  callback: (value: Game[T]) => void
): void => {
  const game = Game.getInstance()
  game.unsubscribe(prop, callback)
}

export const subscribeCell = <T extends keyof Cell>(
  x: number,
  y: number,
  prop: T,
  callback: (value: Cell[T]) => void
): void => {
  const game = Game.getInstance()
  game.cells[x][y].subscribe(prop, callback)
}

export const unsubscribeCell = <T extends keyof Cell>(
  x: number,
  y: number,
  prop: T,
  callback: (value: Cell[T]) => void
): void => {
  const game = Game.getInstance()
  game.cells[x][y].unsubscribe(prop, callback)
}
