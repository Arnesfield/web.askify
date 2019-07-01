import { request, getMessage } from '@/api'
import { snackbar, makeCloseBtn } from '@/helpers/snackbar'

const btnClose = makeCloseBtn()
const VOTE_TYPES = ['upvote', 'downvote', 'unvote']

const vote = function(vote) {
  // vote should be in VOTE_TYPES
  if (!VOTE_TYPES.includes(vote)) {
    return
  }

  this.loading = true

  request({
    ...this.voteRequestProps,
    data: {
      [vote]: 1,
      answer_id: this.item.id
    },
    success: res => {
      // fetch here
      const text = getMessage(res, 'Vote saved.')
      snackbar(text)
      this.fetch()
    },
    error: e => {
      // stop loading here then ;)
      this.loading = false

      const text = getMessage(e.response, 'Unable to save vote.')
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
              this.vote(...arguments)
            }
          },
          btnClose
        ]
      })
    }
  })
}

export { vote }
