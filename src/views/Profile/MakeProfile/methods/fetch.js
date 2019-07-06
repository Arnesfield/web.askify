import { User } from '@/entities'
import { fetch as baseFetch } from '@/views/Profile/ViewProfile/methods/fetch'

const fetch = function() {
  // if create, you obviosly have to make new User
  if (this.isModeCreate) {
    this.item = new User()
  } else {
    baseFetch.bind(this)()
  }
}

export { fetch }