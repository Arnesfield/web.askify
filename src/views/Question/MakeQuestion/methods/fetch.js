import request from '@/api'
import { app } from '@/helpers'
import { Question } from '@/entities'

const fetch = function() {
  // only fetch if update
  if (!this.isModeUpdate) {
    return
  }

  app.load()
  request({
    ...this.requestProps,
    success: res => {
      this.item = new Question(res.data)
    },
    lastly: () => {
      app.load(false)
    }
  })
}

export { fetch }
