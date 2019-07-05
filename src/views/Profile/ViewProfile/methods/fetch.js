import request from '@/api'
import { app } from '@/helpers'

const fetch = function() {
  app.load()
  request({
    url: `users/${this.userId}`,
    method: 'get',
    params: {
      with: ['tags']
    },
    success: res => {
      this.item = res.data
    },
    lastly: () => {
      app.load(false)
    }
  })
}

export { fetch }