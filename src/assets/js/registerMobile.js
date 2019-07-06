class Mobile {
  constructor() {
    this.backables = []
  }

  back(flush = true) {
    let b = this.backables
    if (this.backables.constructor.name !== 'Array') {
      b = [b]
    }

    b.forEach(fn => typeof fn === 'function' ? fn() : undefined)

    // flush
    flush ? this.backables = [] : undefined
  }
}

window.$mobile = new Mobile
