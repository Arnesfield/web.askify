//! examples

// no args, default message
// $vRule('required')

// no args, custom message
// $vRule('required', 'This field is required!')

// with args, default message
// $vRule('required', args, null)

// with args, custom message
// $vRule('required', args, 'This field is required!')

const countDecimals = function(n) {
  if (Math.floor(n) === n) return 0
  return n.toString().split('.')[1].length || 0
}

const RULES = {
  required: {
    msg: 'This field is required.',
    rule: msg => e => {
      if (typeof e === 'undefined' || e === null) {
        return msg
      }

      if (typeof e === 'string') {
        return !!e || msg
      }

      if (typeof e === 'object' && e.constructor.name === 'Array') {
        return e.length > 0 || msg
      }

      return true
    }
  },

  min: {
    msg: 'Minimum is ',
    rule: (msg, min) => e => (e !== null && e >= min) || msg + min + '.'
  },

  max: {
    msg: 'Maximum is ',
    rule: (msg, max) => e => (e !== null && e <= max) || msg + max + '.'
  },

  decimals: {
    msg: 'Number of decimals required is ',
    rule: (msg, d) => e => (e !== null && countDecimals(e) <= d) || msg + d + '.'
  },

  email: {
    msg: 'Invalid email.',
    rule: msg => e => {
      const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return pattern.test(e) || msg
    }
  },

  chars: {
    msg: 'Invalid value.',
    rule: (msg, n) => e => (e ? e.length >= n : false) || msg
  },

  chars8: {
    msg: 'Requires 8 or more characters.',
    rule: msg => e => (e ? e.length >= 8 : false) || msg
  },

  password: {
    msg: 'Requires 6 to 13 characters.',
    rule: msg => e => (e && e.length >= 6 && e.length <= 13) || msg
  },

  numbersOnly: {
    msg: 'Must be numbers only.',
    rule: msg => e => {
      const pattern = /^\+?(0|[1-9]\d*)$/
      return pattern.test(e) || msg
    }
  },

  match: {
    msg: 'Value does not match.',
    rule: (msg, match) => e => (e.length && e == match) || msg
  },

  nonExisting: {
    msg: 'This already exists.',
    rule: (msg, arr) => e => {
      if (!arr) {
        return true
      }
      return arr.indexOf(e) == -1 || msg
    }
  },

  emailUnchanged: {
    msg: 'Email was not changed.',
    rule: (msg, val) => e => {
      return val !== e ? true : msg
    }
  },

  isDuplicate: {
    msg: 'This value already exists.',
    rule: (msg, val) => () => {
      // don't care about the input
      return val || msg
    }
  }
}

const formRules = function(rule, args, msg) {
  // args becomes msg if msg is empty
  if (typeof msg === 'undefined') {
    // if args is empty, msg is default
    msg = typeof args === 'string' ? args : RULES[rule].msg
    // once args has been transfered to msg,
    // assert that args is never used
    // args = args ? args : null
  }

  if (msg === null) {
    // force
    msg = RULES[rule].msg
  }

  return RULES[rule].rule(msg, args)
}

// mixin for components
const formRulesMixin = {
  computed: {
    $vRule: () => formRules
  }
}

export default formRules
export { formRules, formRulesMixin }
