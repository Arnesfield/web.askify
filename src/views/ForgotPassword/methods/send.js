import { app, snackbar } from '@/helpers'
import { request, getMessage } from '@/api'

export default function() {
  if (!this.valid) {
    return
  }

  app.load()
  request({
    url: 'auth/reset',
    method: 'post',
    data: {
      email: this.email
    },
    success: res => {
      const text = getMessage(res, 'Reset password code sent.')
      snackbar(text)
      this.$router.push('/')
    },
    error: e => {
      const text = getMessage(e.response, 'Unable to send reset password code.')
      snackbar(text)
    },
    lastly: () => {
      app.load(false)
    }
  })
}
