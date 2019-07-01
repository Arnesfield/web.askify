import { request, getMessage } from '@/api'
import { snackbar, makeCloseBtn } from '@/helpers/snackbar'

const btnClose = makeCloseBtn()

const best = function() {
  this.loading = true

  request({
    ...this.bestRequestProps,
    method: 'patch',
    data: {},
    success: res => {
      // fetch here
      const text = getMessage(res, 'Answer updated.')
      snackbar(text)
      this.loading = false
      this.fetchAll()
    },
    error: e => {
      // stop loading here then ;)
      this.loading = false

      const text = getMessage(e.response, 'Unable to update answer status.')
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
              this.best()
            }
          },
          btnClose
        ]
      })
    }
  })
}

export { best }
