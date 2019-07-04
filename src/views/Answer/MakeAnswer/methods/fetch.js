import request from '@/api'
import { app } from '@/helpers'
import { Question, Answer } from '@/entities'

const initItem = function() {
  this.item = new Answer({
    content: '',
    img_src: '',
    price: 0,
    currency: 'USD'
  })
}

const fetchQuestion = function() {
  app.load()
  request({
    url: `questions/${this.questionId}`,
    method: 'get',
    params: {
      with: [
        'user',
        'tags'
      ]
    },
    success: res => {
      this.question = new Question(res.data)

      // when u get the question, get the answer ;)
      // make sure you do not unload yet
      this.fetchAnswer()
    },
    error: () => {
      app.load(false)
    }
    // no lastly
  })
}

const fetchAnswer = function() {
  // only fetch if update
  if (this.isModeCreate) {
    // stop the loading here ;)
    app.load(false)
    this.initItem()
    return
  }

  app.load()
  request({
    url: `answers/${this.answerId}`,
    method: 'get',
    params: {
      where: {
        // should be under the question
        question_id: this.questionId
      }
    },
    success: res => {
      this.item = new Answer(res.data)
    },
    lastly: () => {
      app.load(false)
    }
  })
}

export { fetchQuestion, fetchAnswer, initItem }
