import store from '@/store'

export default {
  computed: {
    fetchables() {
      return [this.fetch]
    }
  },

  created() {
    this.registerFetchable()
  },

  beforeDestroy() {
    store.commit('setFetchables')
  },

  methods: {
    registerFetchable() {
      store.commit('setFetchables', this.fetchables)
    }
  }
}
