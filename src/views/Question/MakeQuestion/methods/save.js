import { app, snackbar } from '@/helpers'
import { request, getMessage } from '@/api'

export default function() {
  if (!this.valid) {
    return
  }

  app.load()
  request({
    ...this.requestProps,
    data: this.item.toFormData(),
    success: res => {
      const text = getMessage(res, 'Question saved.')
      snackbar(text)

      // go back
      this.$router.push(`/questions/${res.data.id}`)
    },
    error: e => {
      const text = getMessage(e.response, 'Unable to save question.')
      snackbar(text)
    },
    lastly: () => {
      app.load(false)
    }
  })
}
