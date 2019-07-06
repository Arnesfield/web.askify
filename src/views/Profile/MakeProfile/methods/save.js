import { app, snackbar } from '@/helpers'
import { request, getMessage } from '@/api'

const onSuccess = function(res) {
  const text = getMessage(res, 'User saved.')
  snackbar(text)

  app.load(false)
  // go to
  if (this.isModeUpdate) {
    this.$router.push(`/profile/${res.data.id}`)
  } else {
    this.$router.push('/')
  }
}

export default function() {
  if (!this.valid) {
    return
  }

  const props = !this.changePassword
    ? []
    : (
      this.isModeUpdate
        ? ['old_password', 'password', 'passconf']
        : ['password', 'passconf']
    )

  const data = this.item.toFormData({ props })
  if (this.isModeCreate) {
    data.append('roles[]', this.accountType)
  }

  // add password and such here

  app.load()
  request({
    ...this.requestProps,
    data,
    success: res => {
      // fetch auth/me if isMe
      if (!this.isMe) {
        onSuccess.bind(this)(res)
      } else {
        this.$store.dispatch('auth/me', {
          lastly: () => onSuccess.bind(this)(res)
        })
      }
    },
    error: e => {
      app.load(false)
      const text = getMessage(e.response, 'Unable to save user.')
      snackbar(text)
    }
  })
}
