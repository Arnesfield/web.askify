import request from '@/api'
import { app } from '@/helpers'
import { Question } from '@/entities'

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
      this.items = Question.collection(res.data)
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
