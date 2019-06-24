import request from '@/api'
import { app } from '@/helpers'

const fetch = function() {
  app.load(true)

  request({
    url: 'questions',
    method: 'get',
    params: {
      with: [
        'user',
        'tags'
      ],
      withCount: ['answers'],
      where: {
        user_id: this.$store.state.auth.uid
      }
    },
    success: res => {
      this.items = res.data
    },
    error: () => {
      this.items = null
    },
    lastly: () => {
      app.load(false)
    }
  })
}

export { fetch }
