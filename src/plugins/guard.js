import router from '@/router'
import { setDocTitle } from '@/utils'

router.beforeEach((to, from, next) => {
  setDocTitle(to)
  next()
})
