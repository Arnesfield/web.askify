class Mobile {
  constructor() {
    this.backables = []
  }

  back(flush = true) {
    let b = this.backables
    if (this.backables.constructor.name !== 'Array') {
      b = [b]
    }

    let didExec = false

    b.forEach(fn => {
      didExec = typeof fn === 'function'
      didExec ? fn() : undefined
    })

    // flush
    flush ? this.backables = [] : undefined

    return didExec
  }
}

window.$mobile = new Mobile
