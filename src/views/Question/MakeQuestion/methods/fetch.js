import request from '@/api'
import { app } from '@/helpers'
import { Question } from '@/entities'

const initItem = function() {
  this.item = new Question({
    title: '',
    content: '',
    img_src: ''
  })
}

const fetch = function() {
  // only fetch if update
  if (this.isModeCreate) {
    this.initItem()
    return
  }

  app.load()
  request({
    url: `questions/${this.questionId}`,
    method: 'get',
    params: {
      with: ['tags']
    },
    success: res => {
      this.item = new Question(res.data)
    },
    lastly: () => {
      app.load(false)
    }
  })
}

export { fetch, initItem }
