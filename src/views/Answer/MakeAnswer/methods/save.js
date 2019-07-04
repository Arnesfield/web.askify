import { app, snackbar } from '@/helpers'
import { request, getMessage } from '@/api'

export default function() {
  if (!this.valid) {
    return
  }

  const { isPrivate, questionId: qid } = this

  const data = this.item.toFormData({ isPrivate } )
  data.append('question_id', qid)

  app.load()
  request({
    ...this.requestProps,
    data,
    success: res => {
      const text = getMessage(res, 'Answer saved.')
      snackbar(text)

      // go to question!!
      this.$router.push(`/questions/${qid}`)
    },
    error: e => {
      const text = getMessage(e.response, 'Unable to save answer.')
      snackbar(text)
    },
    lastly: () => {
      app.load(false)
    }
  })
}
