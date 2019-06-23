import store from '@/store'

const makeCloseBtn = override => ({
  text: 'close',
  icon: true,
  color: 'white',
  click: close => close(),
  ...override
})

const snackbar = function(options) {
  store.dispatch('snackbar/make', options)
}

snackbar.makeCloseBtn = makeCloseBtn

export default snackbar
export { snackbar, makeCloseBtn }
