abstract class Observable {
  #observers: { [T in keyof this]?: ((value: typeof this[T]) => void)[] } = {}

  subscribe<T extends keyof this>(
    prop: T,
    callback: (value: typeof this[T]) => void
  ): void {
    const observers = this.#observers[prop]
    if (Array.isArray(observers)) observers.push(callback)
    else this.#observers[prop] = [callback]
  }

  unsubscribe<T extends keyof this>(
    prop: T,
    callback: (value: typeof this[T]) => void
  ): void {
    const observers = this.#observers[prop]
    if (!Array.isArray(observers)) return
    this.#observers[prop] = observers.filter(observer => observer !== callback)
  }

  notify<T extends keyof this>(prop: T): void {
    const observers = this.#observers[prop]
    if (!Array.isArray(observers)) return
    observers.forEach(observer => observer(this[prop]))
  }
}

export default Observable
