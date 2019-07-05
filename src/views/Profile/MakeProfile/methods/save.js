import { app, snackbar } from '@/helpers'
import { request, getMessage } from '@/api'

export default function() {
  if (!this.valid) {
    return
  }

  const data = this.item.toFormData({ props: [] })

  // add password and such here

  app.load()
  request({
    ...this.requestProps,
    data,
    success: res => {
      const text = getMessage(res, 'User saved.')
      snackbar(text)

      // go to
      if (this.isModeUpdate) {
        this.$router.push(`/profile/${res.data.id}`)
      } else {
        this.$router.push('/')
      }
    },
    error: e => {
      const text = getMessage(e.response, 'Unable to save user.')
      snackbar(text)
    },
    lastly: () => {
      app.load(false)
    }
  })
}
