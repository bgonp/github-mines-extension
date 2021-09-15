abstract class Observable {
  #observers: { [T in keyof this]?: ((value: typeof this[T]) => void)[] } = {}

  subscribe<T extends keyof this>(prop: T, callback: (value: typeof this[T]) => void): void {
    if (!this.#observers[prop]) this.#observers[prop] = []
    this.#observers[prop].push(callback)
  }

  unsubscribe<T extends keyof this>(prop: T, callback: (value: typeof this[T]) => void): void {
    if (!this.#observers[prop]) return
    this.#observers[prop] = this.#observers[prop].filter(observer => observer !== callback)
  }

  notify<T extends keyof this>(prop: T): void {
    if (!this.#observers[prop]) return
    this.#observers[prop].forEach(observer => observer(this[prop]))
  }
}

export default Observable
