import store from '@/store'

export default {
  created() {
    this.registerBackable()
  },
  mounted() {
    this.registerBackable()
  },

  beforeDestroy() {
    store.commit('toolbar/setIcon')
  },

  methods: {
    registerBackable() {
      store.commit('toolbar/setIcon', {
        text: 'arrow_back',
        click: () => {
          // this.$router.back()
          // override functionalityyy
          if (typeof this.goBack === 'function') {
            this.goBack()
          } else {
            this.$router.push('/')
          }
        }
      })
    }
  }
}
