import store from '@/store'
import { app } from '@/helpers'
import { request, getMessage } from '@/api'
import { snackbar, makeCloseBtn } from '@/helpers/snackbar'

const btnClose = makeCloseBtn()

export default function(item) {
  app.load()

  request({
    url: `questions/${item.id}/restore`,
    method: 'patch',
    success: res => {
      const text = getMessage(res, 'Question restored.')
      snackbar(text)
      // unload here first in case runFetchables does not unload
      app.load(false)

      // remain on route
      // reload component!!
      store.commit('runFetchables')
    },
    error: e => {
      // unload here
      app.load(false)

      const text = getMessage(e.response, 'Unable to restore question.')
      snackbar({
        text,
        btns: [
          {
            text: 'Retry',
            icon: false,
            color: 'accent',
            to: '',
            click: close => {
              close()
              this.doRestore(...arguments)
            }
          },
          btnClose
        ]
      })
    }
  })
}
