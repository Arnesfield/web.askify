// build[state][0] => mutation
// build[state][1] => default value
// build[state][2] => custom getter
// build[state][3] => custom setter // never used lol

const s = (a, b) => typeof a === 'undefined' ? b : a

const createState = function(build) {
  return Object.keys(build).reduce((res, state) => {
    // do not include if state is undefined
    const val = s(build[state][1], build[state].value)
    if (typeof val !== 'undefined') {
      res[state] = val
    }
    return res
  }, {})
}

const createModel = function(name, build, isBase = false) {
  // make sure to consider if base and not module

  const computed = Object.keys(build).reduce((res, state) => {
    const defaultGet = function() {
      const store = this.$store.state
      return isBase ? store[state] : store[name][state]
    }
    const defaultSet = function(e) {
      const namespace = isBase ? '' : `${name}/`
      const mutation = s(build[state][0], build[state].mutation)
      this.$store.commit(`${namespace}${mutation}`, e)
    }

    // 2 is the get function
    const get = build[state][2] || build[state].get || defaultGet
    const set = build[state][3] || build[state].set || defaultSet

    res[`${name}$${state}`] = { get, set }
    return res
  }, {})

  return { computed }
}

export { createState, createModel }
