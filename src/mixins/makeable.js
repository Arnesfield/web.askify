import { capitalize } from '@/utils'

const MODES = ['create', 'update']

// create computed
const computed = MODES.reduce((computed, mode) => {
  computed[`isMode${capitalize(mode)}`] = function() {
    return mode === this.mode
  }

  return computed
}, {})

export default {
  props: {
    mode: {
      type: String,
      required: true,
      validator: prop => MODES.includes(prop)
    }
  },

  computed
}
