import store from '@/store'

export default {
  created() {
    store.commit('toolbar/setIcon', {
      text: 'arrow_back',
      click: () => {
        this.$router.back()
      }
    })
  },

  beforeDestroy() {
    store.commit('toolbar/setIcon')
  }
}
