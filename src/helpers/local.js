import { ls } from '@/utils'
import { SAVED_PATH_KEY } from '@/keys'

const getter = (remove = true) => {
  const path = ls.getItem(SAVED_PATH_KEY)

  if (remove) {
    ls.removeItem(SAVED_PATH_KEY)
  }

  return path
}

export default {
  // saved path
  set savedPath(path) {
    ls.setItem(SAVED_PATH_KEY, path)
  },
  get savedPath() {
    return getter()
  },

  getSavedPath: (remove = true) => getter(remove)
}
