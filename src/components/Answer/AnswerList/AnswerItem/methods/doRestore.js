import { app } from '@/helpers'
import { request, getMessage } from '@/api'
import { snackbar, makeCloseBtn } from '@/helpers/snackbar'

const btnClose = makeCloseBtn()

export default function(id) {
  app.load()

  request({
    url: `answers/${id}/restore`,
    method: 'patch',
    success: res => {
      const text = getMessage(res, 'Answer restored.')
      snackbar(text)

      // unload here first in case runFetchables does not unload
      app.load(false)
      // when deleted, just fetchAll
      this.fetchAll()
    },
    error: e => {
      // unload here
      app.load(false)

      const text = getMessage(e.response, 'Unable to restore answer.')
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
