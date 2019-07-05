import { app } from '@/helpers'
import { request, getMessage } from '@/api'
import { snackbar, makeCloseBtn } from '@/helpers/snackbar'

const btnClose = makeCloseBtn()

export default function(e, open, load) {
  load()
  app.load()

  request({
    url: `answers/${this.item.id}`,
    method: 'delete',
    success: res => {
      const text = getMessage(res, 'Answer removed.')
      snackbar({
        text,
        btns: [
          {
            text: 'Undo',
            icon: false,
            color: 'accent',
            to: '',
            click: close => {
              close()
              this.doRestore(res.data.id)
            }
          },
          btnClose
        ]
      })

      // unload here first before fetching
      app.load(false)
      // when deleted, just fetchAll
      this.fetchAll()
    },
    error: e => {
      // unload here
      app.load(false)

      const text = getMessage(e.response, 'Unable to remove answer.')
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
              this.doDelete(...arguments)
            }
          },
          btnClose
        ]
      })
    },
    lastly: () => {
      load(false)
      open(false)
    }
  })
}
