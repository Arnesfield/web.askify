import request from '@/api'
import { app } from '@/helpers'
import { User } from '@/entities'

const fetch = function() {
  app.load()
  request({
    url: `users/${this.userId}`,
    method: 'get',
    params: {
      with: ['roles', 'tags']
    },
    success: res => {
      this.item = new User(res.data)
    },
    lastly: () => {
      app.load(false)
    }
  })
}

export { fetch }
