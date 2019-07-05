import { app } from '@/helpers'
import { request, getMessage } from '@/api'
import { snackbar, makeCloseBtn } from '@/helpers/snackbar'

const btnClose = makeCloseBtn()

export default function(e, open, load) {
  load()
  app.load()

  request({
    url: `questions/${this.item.id}`,
    method: 'delete',
    success: res => {
      const text = getMessage(res, 'Question removed.')
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
              this.doRestore(this.item)
            }
          },
          btnClose
        ]
      })

      // go to question!!
      this.$router.push('/')
    },
    error: e => {
      const text = getMessage(e.response, 'Unable to remove question.')
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
      app.load(false)
      open(false)
    }
  })
}
