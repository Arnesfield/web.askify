import request from '@/api'
import { app } from '@/helpers'
import { Question } from '@/entities'

const fetch = function() {
  app.load()

  request({
    url: `questions/${this.questionId}`,
    method: 'get',
    params: {
      withCount: ['answers'],
      with: [
        'user',
        'tags',
        'answers.transactionsViewable'
      ]
    },
    success: res => {
      this.item = new Question(res.data)
    },
    lastly: () => {
      app.load(false)
    }
  })
}

export { fetch }
