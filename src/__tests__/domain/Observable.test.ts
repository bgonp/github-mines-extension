import Observable from 'domain/Observable'

class TestObservable extends Observable {
  #prop = 1

  get prop(): number {
    return this.#prop
  }

  set prop(value: number) {
    this.#prop = value
    this.notify('prop')
  }
}

let testObservable: TestObservable

describe('domain/Observable', () => {
  beforeEach(() => testObservable = new TestObservable())

  it('should notify observers when prop changes', () => {
    const observer = jest.fn()
  
    testObservable.subscribe('prop', observer)
    expect(observer).not.toHaveBeenCalled()
  
    testObservable.prop = 3
    expect(observer).toHaveBeenCalledWith(3)
  })

  it('should notify several observers when prop changes', () => {
    const observer1 = jest.fn()
    const observer2 = jest.fn()
  
    testObservable.subscribe('prop', observer1)
    testObservable.subscribe('prop', observer2)
  
    testObservable.prop = 4
    expect(observer1).toHaveBeenCalledWith(4)
    expect(observer2).toHaveBeenCalledWith(4)
  })

  it('should stop notifying after unsubscribe', () => {
    const observer = jest.fn()
  
    testObservable.subscribe('prop', observer)
    testObservable.prop = 5
    expect(observer).toHaveBeenCalledWith(5)

    observer.mockClear()
    testObservable.unsubscribe('prop', observer)
    testObservable.prop = 7
    expect(observer).not.toHaveBeenCalled()
  })

  it('should not fail if unsubscribe with no subscription', () => {
    expect(() => testObservable.unsubscribe('prop', () => {})).not.toThrowError()
  })

  it('should not fail if notify with no observer', () => {
    expect(() => testObservable.prop = 10).not.toThrowError()
  })
})
