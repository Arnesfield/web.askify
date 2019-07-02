import { request, getMessage } from '@/api'
import { snackbar, makeCloseBtn } from '@/helpers/snackbar'

const btnClose = makeCloseBtn()

const fetch = function() {
  this.loading = true

  request({
    url: `answers/${this.item.id}`,
    method: 'get',
    params: {
      withCount: ['transactionsApproved'],
      with: [
        'user',
        'transactionsViewable'
      ]
    },
    success: res => {
      // TODO: create entity for Answer
      // override data of item only!
      Object.keys(res.data).forEach(key => {
        this.$set(this.item, key, res.data[key])
      })
    },
    error: e => {
      const text = getMessage(e.response, 'Unable to load updated answer.')
      snackbar({
        text,
        btns: [
          {
            text: 'Reload',
            icon: false,
            color: 'accent',
            to: '',
            click: close => {
              close()
              this.fetch()
            }
          },
          btnClose
        ]
      })
    },
    lastly: () => {
      this.loading = false
    }
  })
}

export { fetch }
