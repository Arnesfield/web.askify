import request from '@/api'

const fetch = function(cb) {
  this.loading = true

  request({
    url: 'tags',
    method: 'get',
    success: res => {
      this.items = res.data

      // call cb
      typeof cb === 'function' ? cb() : undefined
    },
    error: () => {
      this.items = []
    },
    lastly: () => {
      this.loading = false
    }
  })
}

export { fetch }
